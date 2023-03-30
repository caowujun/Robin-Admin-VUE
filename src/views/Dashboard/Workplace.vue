<script setup lang="ts">
import { useTimeAgo } from '@/hooks/web/useTimeAgo'
import { ElRow, ElCol, ElSkeleton, ElCard, ElDivider, ElLink } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { ref, reactive } from 'vue'
import { CountTo } from '@/components/CountTo'
import { formatTime } from '@/utils'
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'
import { radarOption, barOptions, lineOptions } from './echarts-data'
import { Highlight } from '@/components/Highlight'
import { cacheQuery } from '@/hooks/web/useCache'

import {
  getCountApi,
  getProjectApi,
  getDynamicApi,
  getTeamApi,
  getRadarApi
} from '@/api/dashboard/workplace'
import {
  getWeeklyUserActivityApi,
  getMonthlySalesApi,
  getWeatherApi
} from '@/api/dashboard/analysis'
import type { WorkplaceTotal, Project, Dynamic, Team } from '@/api/dashboard/workplace/types'
import { set } from 'lodash-es'
import { useAppStore } from '@/store/modules/app'
const { t } = useI18n()
// const { wsCache } = useCache()
const appStore = useAppStore()
const loading = ref(true)
//判定早上，中午，晚上
const hello = ref('')
debugger
hello.value =
  (new Date().getHours() < 12 ? t('app_dashboard.am') : t('app_dashboard.pm')) +
  '，' +
  cacheQuery(appStore.getUserInfo)?.userDisplayName
//当前天气
const weather = ref('')
// 获取统计数
let totalSate = reactive<WorkplaceTotal>({
  project: 0,
  access: 0,
  todo: 0
})

const getCount = async () => {
  const res = await getCountApi().catch(() => {})
  if (res) {
    totalSate = Object.assign(totalSate, res.data)
  }
}
// 获取项目数
let projects = reactive<Project[]>([])
const getProject = async () => {
  const res = await getProjectApi().catch(() => {})
  if (res) {
    projects = Object.assign(projects, res.data)
  }
}

// 获取动态
let dynamics = reactive<Dynamic[]>([])
const getDynamic = async () => {
  const res = await getDynamicApi().catch(() => {})
  if (res) {
    dynamics = Object.assign(dynamics, res.data)
  }
}

// 获取团队
let team = reactive<Team[]>([])
const getTeam = async () => {
  const res = await getTeamApi().catch(() => {})
  if (res) {
    team = Object.assign(team, res.data)
  }
}

// 获取指数
let radarOptionData = reactive<EChartsOption>(radarOption) as EChartsOption
const getRadar = async () => {
  const res = await getRadarApi().catch(() => {})
  if (res) {
    set(
      radarOptionData,
      'radar.indicator',
      res.data.map((v) => {
        return {
          name: t(v.name),
          max: v.max
        }
      })
    )
    set(radarOptionData, 'series', [
      {
        name: `xxx${t('workplace.index')}`,
        type: 'radar',
        data: [
          {
            value: res.data.map((v) => v.personal),
            name: t('workplace.personal')
          },
          {
            value: res.data.map((v) => v.team),
            name: t('workplace.team')
          }
        ]
      }
    ])
  }
}

// 周活跃量
const barOptionsData = reactive<EChartsOption>(barOptions) as EChartsOption
const getWeeklyUserActivity = async () => {
  const res = await getWeeklyUserActivityApi().catch(() => {})
  if (res) {
    set(
      barOptionsData,
      'xAxis.data',
      res.data.map((v) => t(v.name))
    )
    set(barOptionsData, 'series', [
      {
        name: t('analysis.activeQuantity'),
        data: res.data.map((v) => v.value),
        type: 'bar'
      }
    ])
  }
}

// 每月销售总额
const lineOptionsData = reactive<EChartsOption>(lineOptions) as EChartsOption
const getMonthlySales = async () => {
  const res = await getMonthlySalesApi().catch(() => {})
  if (res) {
    set(
      lineOptionsData,
      'xAxis.data',
      res.data.map((v) => t(v.name))
    )
    set(lineOptionsData, 'series', [
      {
        name: t('analysis.estimate'),
        smooth: true,
        type: 'line',
        data: res.data.map((v) => v.estimate),
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      },
      {
        name: t('analysis.actual'),
        smooth: true,
        type: 'line',
        itemStyle: {},
        data: res.data.map((v) => v.actual),
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }
    ])
  }
}

// 获取天气
const getWeather = async () => {
  const res = await getWeatherApi(cacheQuery(appStore.getUserInfo)?.cityCode).catch(() => {})
  console.log(res)
  if (res) {
    // weatherObj.time = res?.time
    // weatherObj.city = res?.cityInfo?.city
    // weatherObj.updateTime = res?.cityInfo?.updateTime
    // weatherObj.parent = res?.cityInfo?.parent
    // weatherObj.low = res?.data?.forecast[0]?.low?.split(' ')[1]
    // weatherObj.high = res?.data?.forecast[0]?.high?.split(' ')[1]
    // weatherObj.wendu = res?.data?.wendu + '℃'
    // weatherObj.type = res?.data?.forecast[0]?.type

    weather.value = `${res?.cityInfo?.parent}${res?.cityInfo?.city}，${t('app_dashboard.today')}${
      res?.data?.forecast[0]?.type
    }，${t('app_dashboard.now')}${res?.data?.wendu}℃，${
      res?.data?.forecast[0]?.low?.split(' ')[1]
    }-${res?.data?.forecast[0]?.high?.split(' ')[1]}。`
  }
}

const getAllApi = async () => {
  await Promise.all([
    getCount(),
    getProject(),
    getWeeklyUserActivity(),
    getMonthlySales(),
    getTeam(),
    getRadar(),
    getDynamic(),
    getWeather()
  ])
  loading.value = false
}

getAllApi()
</script>

<template>
  <div>
    <ElCard shadow="never">
      <ElSkeleton :loading="loading" animated>
        <ElRow :gutter="20" justify="space-between">
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex items-center">
              <img
                src="@/assets/imgs/avatar.jpg"
                alt=""
                class="w-70px h-70px rounded-[50%] mr-20px"
              />
              <div>
                <div class="text-20px text-700">
                  {{ hello }}， {{ t('app_dashboard.happyDay') }}
                </div>
                <div class="mt-10px text-14px text-gray-500">
                  {{ weather }}
                </div>
              </div>
            </div>
          </ElCol>
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex h-70px items-center justify-end <sm:mt-20px">
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.project') }}</div>
                <CountTo
                  class="text-20px"
                  :start-val="0"
                  :end-val="totalSate.project"
                  :duration="2600"
                />
              </div>
              <ElDivider direction="vertical" />
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.toDo') }}</div>
                <CountTo
                  class="text-20px"
                  :start-val="0"
                  :end-val="totalSate.todo"
                  :duration="2600"
                />
              </div>
              <ElDivider direction="vertical" border-style="dashed" />
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.access') }}</div>
                <CountTo
                  class="text-20px"
                  :start-val="0"
                  :end-val="totalSate.access"
                  :duration="2600"
                />
              </div>
            </div>
          </ElCol>
        </ElRow>
      </ElSkeleton>
    </ElCard>
  </div>

  <ElRow class="mt-20px" :gutter="20" justify="space-between">
    <ElCol :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElCard shadow="never">
        <template #header>
          <div class="flex justify-between">
            <span>{{ t('workplace.project') }}</span>
            <ElLink type="primary" :underline="false">{{ t('workplace.more') }}</ElLink>
          </div>
        </template>
        <ElSkeleton :loading="loading" animated>
          <ElRow>
            <ElCol
              v-for="(item, index) in projects"
              :key="`card-${index}`"
              :xl="8"
              :lg="8"
              :md="12"
              :sm="24"
              :xs="24"
            >
              <ElCard shadow="hover">
                <div class="flex items-center">
                  <Icon :icon="item.icon" :size="25" class="mr-10px" />
                  <span class="text-16px">{{ item.name }}</span>
                </div>
                <div class="mt-15px text-14px text-gray-400">{{ t(item.message) }}</div>
                <div class="mt-20px text-12px text-gray-400 flex justify-between">
                  <span>{{ item.personal }}</span>
                  <span>{{ formatTime(item.time, 'yyyy-MM-dd') }}</span>
                </div>
              </ElCard>
            </ElCol>
          </ElRow>
        </ElSkeleton>
      </ElCard>
      <ElCard shadow="never" class="mt-20px">
        <template #header>
          <div class="flex justify-between">
            <span>{{ t('workplace.dynamic') }}</span>
            <ElLink type="primary" :underline="false">{{ t('workplace.more') }}</ElLink>
          </div>
        </template>
        <ElSkeleton :loading="loading" animated>
          <div v-for="(item, index) in dynamics" :key="`dynamics-${index}`">
            <div class="flex items-center">
              <img
                src="@/assets/imgs/avatar.jpg"
                alt=""
                class="w-35px h-35px rounded-[50%] mr-20px"
              />
              <div>
                <div class="text-14px">
                  <Highlight :keys="item.keys.map((v) => t(v))">
                    {{ t('workplace.pushCode') }}
                  </Highlight>
                </div>
                <div class="mt-15px text-12px text-gray-400">
                  {{ useTimeAgo(item.time) }}
                </div>
              </div>
            </div>
            <ElDivider />
          </div>
        </ElSkeleton>
      </ElCard>
      <ElCard shadow="never" class="mt-20px">
        <template #header>
          <div class="flex justify-between">
            <span>{{ t('app_menu.sex') }}</span>
            <!-- <ElLink type="primary" :underline="false">{{ t('workplace.more') }}</ElLink> -->
          </div>
        </template>
        <ElSkeleton :loading="loading" animated>
          <Echart :options="barOptionsData" :height="300" />
        </ElSkeleton>
      </ElCard>

      <ElCard shadow="never" class="mt-20px">
        <template #header>
          <div class="flex justify-between">
            <span>{{ t('app_menu.gasoline') }}</span>
            <!-- <ElLink type="primary" :underline="false">{{ t('workplace.more') }}</ElLink> -->
          </div>
        </template>
        <ElSkeleton :loading="loading" animated>
          <Echart :options="lineOptionsData" :height="350" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElCard shadow="never">
        <template #header>
          <span>{{ t('workplace.shortcutOperation') }}</span>
        </template>
        <ElSkeleton :loading="loading" animated>
          <ElCol
            v-for="item in 9"
            :key="`card-${item}`"
            :xl="12"
            :lg="12"
            :md="12"
            :sm="24"
            :xs="24"
            class="mb-10px"
          >
            <ElLink type="default" :underline="false">
              {{ t('workplace.operation') }}{{ item }}
            </ElLink>
          </ElCol>
        </ElSkeleton>
      </ElCard>

      <ElCard shadow="never" class="mt-20px">
        <template #header>
          <span>xx{{ t('workplace.index') }}</span>
        </template>
        <ElSkeleton :loading="loading" animated>
          <Echart :options="radarOptionData" :height="400" />
        </ElSkeleton>
      </ElCard>

      <ElCard shadow="never" class="mt-20px">
        <template #header>
          <span>{{ t('workplace.team') }}</span>
        </template>
        <ElSkeleton :loading="loading" animated>
          <ElRow>
            <ElCol v-for="item in team" :key="`team-${item.name}`" :span="12" class="mb-20px">
              <div class="flex items-center">
                <Icon :icon="item.icon" class="mr-10px" />
                <ElLink type="default" :underline="false">
                  {{ item.name }}
                </ElLink>
              </div>
            </ElCol>
          </ElRow>
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>
