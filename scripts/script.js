
const date = new Date()
const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

const __textYear = document.querySelector("#footer_year")
const __modifiedDate = document.querySelector("#last_modified_date")

__textYear.textContent = date.getFullYear();
__modifiedDate.textContent = `${String(date.getMonth()).padStart(2, '0')}/${String(date.getDay()).padStart(2, '0')}/${date.getFullYear()} ${time}`;