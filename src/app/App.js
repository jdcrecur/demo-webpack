export default class App {
  constructor () {
    this.message = 'Hi there!'
    this.shoutOut()
  }

  shoutOut () {
    alert(this.message)
  }
}