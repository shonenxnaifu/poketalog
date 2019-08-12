export default class Pokemon {
  constructor (rawData = {}) {
    this.name = rawData.name
    this.nickname = rawData.nickname || ''
    this.owned = rawData.owned || 0
    this.image = ''
    this.moves = ''
    this.types = []
  }
}
