const main = document.querySelector('main')
const input = document.getElementById('input')
const root = document.documentElement;
const resultInput = document.getElementById('result')
const charKey = document.querySelectorAll('.charKey')
const clear = document.getElementById('clear')
const equal = document.getElementById('equal')
const themeInput = document.getElementById('themeSwitcher')
const copyToClipboard = document.getElementById('copyToClipboard')
const allowedInput = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]


charKey.forEach((charKeyButton) => {
    charKeyButton.addEventListener('click', () => {
        const value = charKeyButton.dataset.value
        input.value += value
    })
})

document.addEventListener('keydown', (ev) => {
    ev.preventDefault()
    if(allowedInput.includes(ev.key)) {
        input.value += ev.key
        return
    }

    if(ev.key === 'Backspace') {
        input.value = input.value.slice(0, -1)
    }

    if(ev.key === 'Enter') {
        calculate()
    }
})

clear.addEventListener('click', () => {
    input.value = ''
    input.focus()
})

const calculate = () => {
    try {
        resultInput.value = "ERROR"
        resultInput.classList.add("error")

        const code = input.value
        const executeCode = Function.call(null, `return ${code}`)
        const result = executeCode()

        resultInput.value = result
        resultInput.classList.remove("error")
      } catch (error) {
        console.error(error)
      }
}

equal.addEventListener('click', calculate)

themeInput.addEventListener('click', () => {
    if(main.dataset.theme === 'dark') {
        root.style.setProperty("--bg-color", "#f1f5f9")
        root.style.setProperty("--border-color", "#aaa")
        root.style.setProperty("--font-color", "#212529")
        root.style.setProperty("--primary-color", "#8d3f16a5")
        main.dataset.theme = 'light'

    } else {
        root.style.setProperty("--bg-color", "#212529")
        root.style.setProperty("--border-color", "#666")
        root.style.setProperty("--font-color", "#f1f5f8")
        root.style.setProperty("--primary-color", "#fa732ba5")
        main.dataset.theme = 'dark'
    }
})

copyToClipboard.addEventListener('click', (ev) => {
    const button = ev.currentTarget
    if(button.innerText === 'Copy') {
        button.innerText = 'Copied...'
        button.classList.add('success')
        navigator.clipboard.writeText(resultInput.value)
    } else {
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})