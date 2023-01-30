<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref } from 'vue'
import { ElButton, ElDivider } from 'element-plus'
import { useTable } from '@/hooks/web/useTable'
import { useRouter } from 'vue-router'
import { columns, schema } from './config'
import { Search } from '@/components/Search'
import { getTableListApi, delTableListApi } from '@/api/money'
import { CirclePlus, Delete } from '@element-plus/icons-vue'
import { TableSlotDefault } from '@/types/table'
import { TableData } from '@/api/table/types'

const { t } = useI18n()
const isGrid = ref(false)
const layout = ref('inline')
const buttonPosition = ref('left')
const { push } = useRouter()
const deleteAllBtn = ref(true)
// const selectionsArray = ref<Recordable[]>([])
const delLoading = ref(false)

const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getTableListApi,
  delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'total'
  },
  defaultParams: {
    category: 1
  }
})
const { getList, setSearchParams } = methods

getList()
//to edit page
const editFn = (data: TableSlotDefault) => {
  push({ name: 'moneyEdit', query: { id: data.row.id } })
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
  push({ name: 'money' })
}
//一括削除ボタンを表示するかどうかを判断する
// const selectionChanges = (selection: Recordable[]) => {
//   alert(1)
//   console.log('sdfsdf')
//   deleteAllBtn.value = selection?.length > 0 ? true : false
//   selectionsArray.value = selection
// }

//override the search method
const search = (model) => {
  setSearchParams(model)
}
// const action = (row: TableData, type: string) => {
//   push(`/example/example-${type}?id=${row.id}`)
// }
</script>

<template>
  <Search
    :schema="schema"
    :is-col="isGrid"
    :layout="layout"
    :button-position="buttonPosition"
    @search="search"
    @reset="setSearchParams"
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

    <template #action="{ row }">
      <el-button type="primary" link @click="editFn(row)"> {{ t('app_common.edit') }}</el-button>
      <el-button type="primary" link @click="delData(row, false)">
        {{ t('app_common.delete') }}</el-button
      >
    </template>
  </Table>
</template>

<style lang="less" scoped>
.primaryBtn {
  margin-bottom: 20px;
}
</style>
