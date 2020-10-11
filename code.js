const Keyboad={
    elements:{
        main:null,
        keysContainer:null,
        keys:[]
    },

    eventHandlers:{
        oninput:null,
    },

    properties:{
        value:'',
        caps:false,
    },

    init(){
        this.elements.main=document.createElement("div");
        this.elements.keysContainer=document.createElement("div");

        this.elements.main.classList.add("keyboard","keyboard--hidden");
        this.elements.keysContainer.classList.add("keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.key')

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll('.use-keyboard-input').forEach(element=>{
            element.addEventListener('focus',()=>{
                this.open(element.value, currentValue=>{
                    element.value=currentValue;
                })
            })
        })
    },

    _createKeys(){
        const fragment = document.createDocumentFragment();
        const KeyLayout= [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];
        
        function createIcon(iconName){
            return `<i class="material-icons">${iconName}</i>`
        }
        KeyLayout.forEach(key=>{
            const keyElement = document.createElement('button');
            const insertBreak = ["backspace","p","enter","?",].indexOf(key)!=-1;
            keyElement.classList.add('key');

            switch(key){
                case 'backspace':
                    keyElement.innerHTML=createIcon('backspace');
                    keyElement.classList.add('big');

                    keyElement.addEventListener('click',()=>{
                        this.properties.value=this.properties.value.substring(0,this.properties.value.length-1);
                        this._triggerEvent('oninput');
                    })
                break
                case 'caps':
                    keyElement.innerHTML=createIcon('keyboard_capslock');
                    keyElement.classList.add('big','caps');

                    keyElement.addEventListener('click',()=>{
                        this._toggleCaps(keyElement);
                        // keyElement.classList.toggle('active',this.properties.caps)
                    })
                break

                case 'enter':
                    keyElement.innerHTML=createIcon('keyboard_return');
                    keyElement.classList.add('big');

                    keyElement.addEventListener('click',()=>{
                       this.properties.value+='\n';
                       this._triggerEvent('oninput');
                    })
                break

                case 'space':
                    keyElement.innerHTML=createIcon('space_bar');
                    keyElement.classList.add('space');

                    keyElement.addEventListener('click',()=>{
                       this.properties.value+=' ';
                       this._triggerEvent('oninput');
                    })
                break

                case 'done':
                    keyElement.innerHTML=createIcon('check_circle');
                    keyElement.classList.add('dark', 'big');

                    keyElement.addEventListener('click',()=>{
                       this.close();
                    //    this._triggerEvent('onclose');
                    })
                break
                default:
                    keyElement.textContent=key.toLowerCase();

                    keyElement.addEventListener('click',()=>{
                        this.properties.value+=this.properties.caps ? key.toUpperCase(): key.toLowerCase();
                        this._triggerEvent('oninput');
                    })
                break
            }
            fragment.appendChild(keyElement);
            if (insertBreak) {
                const lineBreak = document.createElement("div");
                lineBreak.classList.add('break');
                fragment.appendChild(lineBreak)
            }
        })
        return fragment;
    },

    _triggerEvent(handlerName){
        if (typeof this.eventHandlers[handlerName]=='function'){
            this.eventHandlers[handlerName](this.properties.value)
        }
    },

    _toggleCaps(keyElement){
        keyElement.classList.toggle('active');
        this.properties.caps = !this.properties.caps;
        for (let key of this.elements.keys){
            if (key.childElementCount==0){
                key.textContent = this.properties.caps ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }


    },

    open(initalValue,oninput){
        this.properties.value = initalValue || '';
        this.eventHandlers.oninput = oninput;
        this.elements.main.classList.remove('keyboard--hidden')
    },
    close(){
        this.properties.value = '';
        if(this.properties.caps)this._toggleCaps(this.elements.keysContainer.querySelector('.caps'));
        this.elements.main.classList.add('keyboard--hidden')
    },
}

window.addEventListener('DOMContentLoaded',function(){
    Keyboad.init();
})


