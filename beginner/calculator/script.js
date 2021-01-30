window.addEventListener('DOMContentLoaded', () => {
  main()
})
const calcStructure = [
  'AC',
  '<=',
  '/',
  '*',
  '1',
  '2',
  '3',
  '-',
  '4',
  '5',
  '6',
  '+',
  '7',
  '8',
  '9',
  '=',
]
const calcBodyEl = document.querySelector('[data-calcBody]')
const outputCur = document.querySelector('[data-output-cur]')
const outputPrev = document.querySelector('[data-output-prev]')

class Calculator {
  constructor(outputCur, outputPrev) {
    this.outputCur = outputCur
    this.outputPrev = outputPrev
  }

  curNums = ''
  prevNums = ''
  operator = ''

  add(op) {
    if (!this.curNums && !+op) return
    if (this.operator === '=' && op === '=') return
    if (this.curNums !== '' && !+op) return this.addOperator(op)
    this.curNums = this.curNums === '0' ? op : this.curNums + op
    this.updateDisplay()
  }

  addOperator(operator) {
    this.operator = operator
    if (operator.length < 2) {
      if (this.prevNums !== '' && this.curNums !== '') {
        this.curNums =
          this.operator !== '='
            ? this.compute(this.operator)
            : this.compute(this.prevNums.slice(-1))
        this.prevNums = ''
        return this.updateDisplay()
      }

      this.prevNums += this.curNums + operator
      this.curNums = ''
    } else {
      switch (operator) {
        case '<=':
          this.curNums =
            this.curNums.length < 2 ? '0' : this.curNums.slice(0, -1)
          break

        case 'AC': {
          this.curNums = '0'
          this.prevNums = ''
          break
        }
      }
    }

    this.updateDisplay()
  }

  compute(operation) {
    let res
    switch (operation) {
      case '+': {
        res = +this.prevNums.slice(0, -1) + +this.curNums
        break
      }

      case '-': {
        res = +this.prevNums.slice(0, -1) - +this.curNums
        break
      }

      case '/': {
        res = +this.prevNums.slice(0, -1) / +this.curNums
        break
      }

      case '*': {
        res = +this.prevNums.slice(0, -1) * +this.curNums
        break
      }
    }

    return res.toString()
  }

  updateDisplay() {
    outputCur.innerText = this.curNums
    outputPrev.innerText = this.prevNums
  }
}

const clc = new Calculator(outputCur, outputPrev)

function main() {
  displayBtns()
  listenBtns()
  listenClient()
}

function displayBtns() {
  let output = ''

  for (let i = 0; i < calcStructure.length; i++) {
    output += `<button class="btn" data-btn>${calcStructure[i]}</button>`
  }

  calcBodyEl.innerHTML = output
}

function listenBtns() {
  const btnsEls = document.querySelectorAll('[data-btn]')

  btnsEls.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      clc.add(e.target.textContent)
    })
  })
}

function listenClient() {
  window.addEventListener('keypress', (e) => {
    if (calcStructure.includes(e.key) || e.key === 'Enter') {
      const temp = e.key === 'Enter' ? '=' : e.key
      clc.add(temp)
    }
    return
  })
}
