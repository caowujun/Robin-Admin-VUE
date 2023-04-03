<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { onMounted, ref } from 'vue'
import { ElButton, ElDivider } from 'element-plus'
import { useTable } from '@/hooks/web/useTable'
import { useRoute, useRouter } from 'vue-router'
import { columns, schema } from './config'
import { Search } from '@/components/Search'
import { getTableListApi, delTableListApi } from '@/api/article'
import { CirclePlus, Delete } from '@element-plus/icons-vue'
import { TableSlotDefault } from '@/types/table'
import { TableData } from '@/api/table/types'
import { useDictStoreWithOut } from '@/store/modules/dict'

const { query } = useRoute()
const { t } = useI18n()
const isGrid = ref(false)
const layout = ref('inline')
const buttonPosition = ref('left')
const { push } = useRouter()
const deleteAllBtn = ref(true)
const delLoading = ref(false)
const dictStore = useDictStoreWithOut()

const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getTableListApi,
  delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'total'
  },
  defaultParams: {}
})
const { getList, setSearchParams } = methods
//查询
// const searchForm = ref({})
//从主页进来，如果不用onMounted,可以实现给Search组件赋值，但是使用了就不行。（onMounted 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码）
//还一个办法就是在Search组件直接使用：model={ articleType: query?.articleType }
onMounted(async () => {
  if (
    query?.articleType &&
    dictStore.getDictObj['ARTICLESHARE'].findIndex(
      (f) => parseInt(f.value) === parseInt(query?.articleType as string)
    ) > 0
  ) {
    // searchForm.value = { articleType: query?.articleType }
    setSearchParams({ articleType: query?.articleType })
  } else {
    getList()
  }
})

//to edit page
const editFn = (row: TableSlotDefault) => {
  push({ name: 'articleEdit', query: { id: row.id } })
}

const delData = async (row: TableData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  delLoading.value = true
  await delList(
    multiple ? selections.map((v) => v.id) : [tableObject.currentRow?.id as string],
    multiple
  ).finally(() => {
    delLoading.value = false
  })
}

//to create page
const toCreatePage = () => {
  push({ name: 'articleAdd' })
}

//override the search method
const search = (model) => {
  setSearchParams(model)
}
// const action = (row: TableData, type: string) => {
//   push(`/example/example-${type}?id=${row.id}`)
// }
const articleOpenClick = async (data: TableSlotDefault) => {
  window.open(data.row.articleUrl)
}
</script>

<template>
  <Search
    :model="{ articleType: query?.articleType }"
    :schema="schema"
    :is-col="isGrid"
    :layout="layout"
    :button-position="buttonPosition"
    @search="search"
    @reset="search"
    ref="formRef"
  />
  <ElDivider style="margin-top: 5px; margin-bottom: 15px" />
  <div class="mb-15px">
    <ElButton :icon="CirclePlus" type="primary" @click="toCreatePage">{{
      t('app_common.add')
    }}</ElButton>
    <ElButton
      :icon="Delete"
      :loading="delLoading"
      type="danger"
      @click="delData(null, true)"
      v-if="deleteAllBtn == true"
    >
      {{ t('app_common.deleteAll') }}
    </ElButton>
  </div>

  <Table
    fit
    v-model:pageSize="tableObject.pageSize"
    v-model:currentPage="tableObject.currentPage"
    :columns="columns"
    :data="tableObject.tableList"
    :loading="tableObject.loading"
    :pagination="{
      total: tableObject.total
    }"
    @register="register"
    :showOverflowTooltip="true"
    :emptyText="`${t('app_common.noMessage')}`"
  >
    <!-- <template #createdDateTime="data">
      {{ data.row.createdDateTime && dateFormatSingle(new Date(data.row.createdDateTime), true) }}
    </template> -->
    <template #articleUrl="data">
      <a
        @click="articleOpenClick(data as TableSlotDefault)"
        style="color: #409eff; cursor: pointer"
      >
        {{ data.row.articleUrl }}</a
      >
    </template>
    <template #action="{ row }">
      <el-button type="primary" link @click="editFn(row)"> {{ t('app_common.edit') }}</el-button>
      <el-button type="primary" link @click="delData(row, false)">
        {{ t('app_common.delete') }}</el-button
      >
    </template>
  </Table>
</template>

<style lang="less" scoped>
// .primaryBtn {
//   margin-bottom: 20px;
// }
</style>
