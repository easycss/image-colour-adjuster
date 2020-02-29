const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let img = new Image()
let fileName = ""

const uploadFile = document.getElementById("upload-file")
const revertBtn = document.getElementById("revert-btn")
const downloadBtn = document.getElementById("download-btn")


// brightness/contrast/saturation/vibrance
document.addEventListener("click", e => {
  if (e.target.classList.contains("filter-btn")) {
    switch (true) {
    
    case e.target.classList.contains("noise-add"):
    Caman("#canvas", img, function() {
        this.noise(1).render()
    })
    break
    case e.target.classList.contains("colorize-add"):
    Caman("#canvas", img, function() {
        this.colorize(100,100,100,-10).render()
    })
    break
    case e.target.classList.contains("sepia-add"):
    Caman("#canvas", img, function() {
        this.sepia(10).render()
    })
    break
    case e.target.classList.contains("invert-add"):
    Caman("#canvas", img, function() {
        this.invert().render()
    })
    break
    case e.target.classList.contains("brightness-add"):
    Caman("#canvas", img, function() {
        this.brightness(1).render()
    })
    break
    case e.target.classList.contains("brightness-remove"):
    Caman("#canvas", img, function() {
        this.brightness(-1).render()
    })
    break
    case e.target.classList.contains("contrast-add"):
    Caman("#canvas", img, function() {
        this.contrast(1).render()
    })
    break
    case e.target.classList.contains("contrast-remove"):
    Caman("#canvas", img, function() {
        this.contrast(-1).render()
    })
    break
    case e.target.classList.contains("saturation-add"):
    Caman("#canvas", img, function() {
        this.saturation(5).render()
    })
    break
    case e.target.classList.contains("saturation-remove"):
    Caman("#canvas", img, function() {
        this.saturation(-5).render()
    })
    break
    case e.target.classList.contains("vibrance-add"):
    Caman("#canvas", img, function() {
        this.vibrance(5).render()
    })
    break
    case e.target.classList.contains("vibrance-remove"):
    Caman("#canvas", img, function() {
        this.vibrance(-5).render()
    })
    break
    case e.target.classList.contains("channel-red-add"):
    Caman("#canvas", img, function() {
        this.channels({
            red: 5
        }).render()
    })
    break
    case e.target.classList.contains("channel-red-remove"):
    Caman("#canvas", img, function() {
        this.channels({
            red: -5
        }).render()
    })
    break
    case e.target.classList.contains("channel-green-add"):
    Caman("#canvas", img, function() {
        this.channels({
            green: 5
        }).render()
    })
    break
    case e.target.classList.contains("channel-green-remove"):
    Caman("#canvas", img, function() {
        this.channels({
            green: -5
        }).render()
    })
    break
    case e.target.classList.contains("channel-blue-add"):
    Caman("#canvas", img, function() {
        this.channels({
            blue: 5
        }).render()
    })
    break
    case e.target.classList.contains("channel-blue-remove"):
    Caman("#canvas", img, function() {
        this.channels({
            blue: -5
        }).render()
    })
    break
    case e.target.classList.contains("hue-add"):
    Caman("#canvas", img, function() {
        this.hue(50).render()
    })
    break
    }
  }
})

// Upload File
uploadFile.addEventListener("change", e => {
  // Get File
  const file = document.getElementById("upload-file").files[0]

  // Init FileReader
  const reader = new FileReader()

  if (file) {
    // Set File Name
    fileName = file.name
    // Read Data As URL
    reader.readAsDataURL(file)
  }

  // Add Image To Canvas
  reader.addEventListener(
    "load",
    () => {
      // Create Image
      img = new Image()
      // Set Src
      img.src = reader.result
      // On Image Load, Add To Canvas
      img.onload = function() {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)
        canvas.removeAttribute("data-caman-id")
      }
    },
    false
  )
})


// Remove all filters
revertBtn.addEventListener('click', (e) => {
    Caman('#canvas', img, function(){
        this.revert()
    })
})

// Download finished image
downloadBtn.addEventListener('click', (e) => {
    // get file suffix and remove last 4 characters
    // e.g .jpg or .png
    const fileSuffix = fileName.slice(-4)

    // initialise new filename
    let newFileName

    // check image type
    if(fileSuffix === '.jpg' || fileSuffix === '.jpeg' || fileSuffix === '.png'){
        // delete suffix from file 
        newFileName = fileName.substring(0, fileName.length -4) + '-new.jpg'
    }

    // call function
    download(canvas, newFileName)

    function download(canvas, filename){
        // initialise event
        let e
        //create link
        const link = document.createElement('a')
        // set properties
        link.download = filename
        link.href = canvas.toDataURL('image/jpeg', 0.8)
        // new mouse event
        e = new MouseEvent('click')
        // dispatch event
        link.dispatchEvent(e)
    }
})
