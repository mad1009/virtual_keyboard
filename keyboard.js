class Keyboard{
    /**
     * Initialize the keyboard
     * @param {HTMLElement} keyboardEl The keyboard element html containing all letters and numbers
     * @param {HTMLElement} numpadEl The keyboard html element containing only numbers
     */
    constructor(keyboardEl, numpadEl){
        this.keyboard = keyboardEl
        this.numpad = numpadEl
        // Check if the keyboard is displayed or not
        this.active = false
        // The selected input
        this.selectedInput = null
        // Keyboard type (numpad or regular keyboard)
        this.selectedKeyboard = null
        // Handle buttons click
        this.handleKeyboardButtons()
        // This prop track if a comma is already in the text input or not
        this.mem = null
    }

    /**
     * Create events listeners for keyboards buttons
     */
    handleKeyboardButtons(){
        this.keyboard.querySelectorAll('button').forEach(btn=>{
            btn.addEventListener("mousedown",(ev)=>{
                ev.preventDefault()
                this.writeToInput(btn.innerText)
            })
        })
        this.numpad.querySelectorAll('button').forEach(btn=>{
            btn.addEventListener("mousedown",(ev)=>{
                ev.preventDefault()
                this.writeToInput(btn.innerText)
            })
        })
    }

    /**
     * Show the keyboard on the right placement
     * @param {DOMRect} position this param has all selected input position data 
     */
    showKeyboard(position){
        // Get the position
        const target = this.selectedKeyboard
        // Handling animation using the animate lib
        anime({
            begin: function (){
                target.classList.remove("hidden_keyboard")
            },
            targets:target,
            translateX: position.left.toString()+"px",
            // Place the keyboard on the bottom of the input based on the full height of the window
            top:  (position.bottom + 3 +  window.scrollY).toString()+"px",
            opacity: 1,
            duration: 500,
            easing: "easeInOutExpo"
    
    
          });
    
        
    }
    /**
     * Add text to the selected input
     * @param {String} text The text to be added to the input
     */
    writeToInput(text){
        // Delete the last char
        if(text === "DEL"){
            const selectedInputText = this.selectedInput.value
            // if(selectedInputText.substring(0, selectedInputText.length - 1)){}
            let target = selectedInputText.substring(0, selectedInputText.length - 1)
            if(target.substring(target.length -1) == "."){
                target = target.substring(0,target.length-1)
            }
                this.selectedInput.value = target
        // Delete all from the input
        }else if(text === "AC"){
            this.selectedInput.value = ""
        // While using the numpad keyboard check if "." is already in the number input
        }else if(text ==="." && this.selectedKeyboard == this.numpad){
            if(!this.mem){
                this.mem = "."
            }
        }
        
        else{
            const selectedInputText =  this.selectedInput.value
            if(this.mem){
                this.selectedInput.value = selectedInputText + this.mem+ text
                this.mem = null
            }else{
                this.selectedInput.value = selectedInputText + text
            }

        }
    }
    /**
     * This function is responsible for:
     * - Selecting the right type of the keyboard
     * - Set the selected input to the active input in the window
     * - Pass the input position to "showKeyboad" function to place the keyboard on the right position
     * @param {String} type The input type number or text
     * @param {DOMRect} position The input position data
     */
    activateKeyboard(type, position=null){
        this.active = true
        this.selectedKeyboard = type === "number" ? this.numpad : this.keyboard 
        this.selectedInput = document.activeElement
        this.showKeyboard(position)

    }
    /**
     * Hide the keyboard, this function is called if the focused input is not focused anymore
     */
    hideKeyboard(){
        const target = this.selectedKeyboard
        // Hide the keyboard
        anime({
            complete: function (){
                target.classList.add("hidden_keyboard")
            },
            targets:target,
            left: 0,
            // top:  (position.bottom+parseInt(keyboardmarginbotton)).toString()+"px",
            opacity: 0,
            // borderRadius: ['0%', '50%'],
            duration: 500,
            easing: "easeInOutExpo"
    
          });

        this.selectedInput = null
        this.selectedKeyboard = null
        // this.keyboard.classList.add("hidden_keyboard")
        // this.numpad.classList.add("hidden_keyboard")
    }
}


// Inject keyboard html
document.body.innerHTML += `
<div class="numpad hidden_keyboard card card-body">
<button class="btn btn-dark" >1</button>
<button class="btn btn-dark" >2</button>
<button class="btn btn-dark" >3</button>
<button class="btn btn-dark" >4</button>
<button class="btn btn-dark" >5</button>
<button class="btn btn-dark" >6</button>
<button class="btn btn-dark" >7</button>
<button class="btn btn-dark" >8</button>
<button class="btn btn-dark" >9</button>
<button class="btn btn-dark" >0</button>
<button class="btn btn-dark" >DEL</button>
<button class="btn btn-dark" >.</button>
<button class="btn btn-dark"  style="grid-column: 1/-1;" >AC</button>
</div>

<div class="keyboard hidden_keyboard card card-body">
<button class="btn btn-dark" >1</button>
<button class="btn btn-dark" >2</button>
<button class="btn btn-dark" >3</button>
<button class="btn btn-dark" >4</button>
<button class="btn btn-dark" >5</button>
<button class="btn btn-dark" >6</button>
<button class="btn btn-dark" >7</button>
<button class="btn btn-dark" >8</button>
<button class="btn btn-dark" >9</button>
<button class="btn btn-dark" >0</button>
<button class="btn btn-dark" >.</button>
<button class="btn btn-dark" >,</button>
<button class="btn btn-dark" >a</button>
<button class="btn btn-dark" >z</button>
<button class="btn btn-dark" >e</button>
<button class="btn btn-dark" >r</button>
<button class="btn btn-dark" >t</button>
<button class="btn btn-dark" >y</button>
<button class="btn btn-dark" >u</button>
<button class="btn btn-dark" >i</button>
<button class="btn btn-dark" >o</button>
<button class="btn btn-dark" >p</button>
<button class="btn btn-dark" >q</button>
<button class="btn btn-dark" >s</button>
<button class="btn btn-dark" >d</button>
<button class="btn btn-dark" >f</button>
<button class="btn btn-dark" >g</button>
<button class="btn btn-dark" >h</button>
<button class="btn btn-dark" >j</button>
<button class="btn btn-dark" >k</button>
<button class="btn btn-dark" >l</button>
<button class="btn btn-dark" >m</button>
<button class="btn btn-dark" >w</button>
<button class="btn btn-dark" >x</button>
<button class="btn btn-dark" >c</button>
<button class="btn btn-dark" >v</button>
<button class="btn btn-dark" >b</button>
<button class="btn btn-dark" >n</button>
<button class="btn btn-dark"  style="grid-column: span 3;">AC</button>
<button class="btn btn-dark"  style="grid-column: span 3;">DEL</button>
<button class="btn btn-dark"  style="grid-column: 1/-1;">&nbsp;</button>

</div>
`

// Get keyboards
const numpadEl = document.querySelector('.numpad')
const keyboardEl = document.querySelector('.keyboard')


// Initialize the keyboard object
const keyboard = new Keyboard(keyboardEl, numpadEl)

// Select all text based input on the page
document.querySelectorAll('input[type=text],input[type=password],input[type=number]').forEach(inp=>{
    inp.addEventListener('focusin',()=>{
        // Show the keyboard based on the type and the position of the focused input
        keyboard.activateKeyboard(inp.type, inp.getBoundingClientRect())
    })

    //Hide the keyboard
    inp.addEventListener('focusout',()=>{
        keyboard.hideKeyboard()
    })
})

