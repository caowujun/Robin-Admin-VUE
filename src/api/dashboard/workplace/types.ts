export type WorkplaceTotal = {
  project: number
  access: number
  todo: number
}

export type Project = {
  name: string
  icon: string
  message: string
  personal: string
  time: Date | number | string
  articleType: number
}

export type Dynamic = {
  keys: string[]
  time: Date | number | string
}

export type Team = {
  name: string
  icon: string
}

export type RadarData = {
  personal: number
  team: number
  max: number
  name: string
}

// export type Weather = {
//   time: string
//   city: string
//   parent: string
//   updateTime: string
//   low: string
//   high: string
//   wendu: string
//   type: string
// }
