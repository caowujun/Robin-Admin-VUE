<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import { useTable } from '@/hooks/web/useTable'
import { useRouter } from 'vue-router'
import { columns } from './config'
import { getTableListApi, delTableListApi } from '@/api/role'
import { CirclePlus } from '@element-plus/icons-vue'
import { TableSlotDefault } from '@/types/table'
import { TableData } from '@/api/table/types'

const { t } = useI18n()

const { push } = useRouter()
const delLoading = ref(false)

const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getTableListApi,
  delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})
const { getList, setProps } = methods
//不显示多选框
setProps({
  selection: false
})
getList()

//to edit page
const editFn = (row: TableSlotDefault) => {
  push({ name: 'roledit', query: { id: row.id } })
}
//delete，适配全部删除和单个删除
const delData = async (row: TableData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList } = methods
  delLoading.value = true
  await delList([tableObject.currentRow?.id as string], multiple).finally(() => {
    delLoading.value = false
  })
}

//to create page
const toCreatePage = () => {
  push({ name: 'roleAdd' })
}
</script>

<template>
  <div class="mb-15px">
    <ElButton :icon="CirclePlus" type="primary" @click="toCreatePage">{{
      t('app_common.add')
    }}</ElButton>
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
// .primaryBtn {
//   margin-bottom: 20px;
// }
</style>
