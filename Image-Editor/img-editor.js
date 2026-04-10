let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hue: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}

const imgcanvas = document.querySelector("#img")
const filter_container = document.querySelector(".filters")
const imginp = document.querySelector("#img-input")
const canvas_ctx = imgcanvas.getContext("2d")
const resetbtn = document.querySelector("#reset-btn")
const downbtn=document.querySelector("#download-btn")
const bottomDiv = document.querySelector(".bottom")

let f = null
let image = null

bottomDiv.addEventListener("click", () => imginp.click())

function create_filter_elm(name, unit = "%", value, min, max) {
    const div = document.createElement("div")
    div.classList.add("filter")
    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name
    const percentage = ((value - min) / (max - min)) * 100;
    input.style.setProperty('--fill', `${percentage}%`);
    const p = document.createElement("p");
    p.innerText = name.charAt(0).toUpperCase() + name.slice(1)
    div.appendChild(p)
    div.appendChild(input)
    input.addEventListener("input", (evt) => {
        filters[name].value = input.value
        const percentage = ((input.value - min) / (max - min)) * 100;
        input.style.setProperty('--fill', `${percentage}%`);
        apply_filters()
    })
    return div
}

function create_filters() {
    Object.keys(filters).forEach(key => {
        const filter_elm = create_filter_elm(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
        filter_container.appendChild(filter_elm)

    })
}
create_filters()

function apply_filters() {
    if (!image) return;
    // Fix: Use imgcanvas instead of canvas
    imgcanvas.style.filter = `brightness(${filters.brightness.value}%) contrast(${filters.contrast.value}%) saturate(${filters.saturation.value}%) hue-rotate(${filters.hue.value}deg) blur(${filters.blur.value}px) grayscale(${filters.grayscale.value}%) sepia(${filters.sepia.value}%) opacity(${filters.opacity.value}%) invert(${filters.invert.value}%)`;
}

imginp.addEventListener("change", (evt) => {
    f = evt.target.files[0]
    const img_plchldr = document.querySelector(".placeholder")
    imgcanvas.style.display = "block"
    img_plchldr.style.display = "none"
    const img = new Image()
    img.src = URL.createObjectURL(f)
    img.onload = () => {
        image = img
        imgcanvas.width = img.width
        imgcanvas.height = img.height
        canvas_ctx.drawImage(img, 0, 0)
        imgcanvas.style.filter = 'none' // Fix: Use imgcanvas here
    }
})

resetbtn.addEventListener("click", () => {
    filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        hue: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg"
        },
        blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px"
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%"
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
    }
    apply_filters()
    filter_container.innerHTML = ""
    create_filters()
})

downbtn.addEventListener("click",()=>{
    const link=document.createElement("a")
    link.download="edited-img.png"
    link.href=imgcanvas.toDataURL()
    link.click()
})