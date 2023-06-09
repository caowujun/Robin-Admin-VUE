<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref } from 'vue'
import { ElButton, ElDivider } from 'element-plus'
import { useTable } from '@/hooks/web/useTable'
import { columns, schema } from './config'
import { Search } from '@/components/Search'
import { getSysLogTableListApi as getTableListApi } from '@/api/log'
import { TableSlotDefault } from '@/types/table'
import { TableData } from '@/api/table/types'

const { t } = useI18n()
const isGrid = ref(false)
const layout = ref('inline')
const buttonPosition = ref('left')
const dialogVisible = ref(false)
const log = ref('')
const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getTableListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})
const { getList, setSearchParams, setProps } = methods
//不显示多选框
setProps({
  selection: false
})
getList()

//to edit page
const viewFn = (row: TableSlotDefault) => {
  console.log(row)

  log.value = row.actionText
  dialogVisible.value = true
}

//override the search method
const search = (model) => {
  setSearchParams(model)
}
</script>

<template>
  <Search
    :schema="schema"
    :is-col="isGrid"
    :layout="layout"
    :button-position="buttonPosition"
    @search="search"
    @reset="search"
  />
  <ElDivider style="margin-top: 5px; margin-bottom: 15px" />

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
      <el-button type="primary" link @click="viewFn(row)"> {{ t('app_common.detail') }}</el-button>
    </template>
  </Table>
  <el-dialog v-model="dialogVisible" :title="t('app_common.detail')" width="30%">
    <span>{{ log }}</span>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">Cancel</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">
          {{ t('app_common.cancel') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
// .primaryBtn {
//   margin-bottom: 20px;
// }
</style>
