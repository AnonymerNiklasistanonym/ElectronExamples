var degree = 360
const filler = document.getElementById("watch-filler")
const mask = document.getElementById("watch-filler")
const spinner = document.getElementById("watch-spinner")

window.onload = reset

function reset() {
  console.log("Reset watch")
  degree = 360
  setDegree()
}

function setDegree() {
  filler.style.transform = "rotate(" + (degree - 360) + "deg)"
  mask.style.transform = "rotate(" + (degree - 360) + "deg)"
  if (degree <= 180) {
    spinner.style.backgroundImage =
      "linear-gradient(to right, white 50%, transparent 0)"
  } else {
    spinner.style.backgroundImage =
      "linear-gradient(to right, transparent 50%, black 0)"
  }
  spinner.style.transform = "rotate(" + (degree - 180) + "deg)"
}

window.onkeypress = e => {
  switch (e.keyCode ? e.keyCode : e.which) {
    case 43: // +
      if (degree < 360) {
        degree += 1
        setDegree()
      }
      break
    case 45: // -
      if (degree > 0) {
        degree -= 1
        setDegree()
      }
      break
    case 114: //r
      reset()
  }
}
