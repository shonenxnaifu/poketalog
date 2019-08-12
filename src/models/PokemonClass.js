export default class Pokemon {
  constructor (rawData = {}) {
    this.name = rawData.name
    this.owned = 0
    this.image = ''
    this.moves = ''
    this.types = []
  }
}
