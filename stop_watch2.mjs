')
        
        small.className = `box_${names[s]}`
        this.dom.shape_4[`box_${names[s]}`]=small
        time_box.appendChild(small)
      }
      this.main_container.appendChild(time_box)
    }
    const btns   =()=>{
      const con = document.createElement('div')
      con.className='numbers'
      
      //create numbers btns
      for(let i = 1 ; i <= 9 ; i++){
        const btn = document.createElement('button')
        btn.setAttribute('type','button')
        btn.innerText = i
        btn.className = `_${i}_`
        con.appendChild(btn)
        arr.push(btn)
      }
      const zero   = document.createElement('button')
      zero.textContent ='0'
      zero.className='_0_'
      
      
      const play   = document.createElement('button')
      play.textContent ='▶'
      play.className='play'
      
      const cancel =document.createElement('button')
      cancel.innerHTML =`<?xml version="1.0" encoding="utf-8"?><svg version="1.1" fill='white' id="Layer_1" width='25px' height='25px' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 84.27" style="enable-background:new 0 0 122.88 84.27" xml:space="preserve"><g><path d="M41,0h70.56c3.12,0,5.95,1.27,8,3.32c2.05,2.05,3.32,4.88,3.32,8v61.63c0,3.12-1.27,5.95-3.32,8 c-2.05,2.05-4.88,3.32-8,3.32H40.67l-0.18-0.01c-10.44-0.6-19.13-13.09-27.57-25.21C9.21,53.72,5.55,48.46,2.03,44.62L0,42.41 l2.01-2.23c4.39-4.89,8.55-10.75,12.56-16.39C23.35,11.41,31.45,0,41,0L41,0z M83.95,24.11c2.22-2.26,5.84-2.27,8.07-0.02 c2.23,2.24,2.24,5.9,0.02,8.15l-9.75,9.89l9.76,9.9c2.21,2.24,2.17,5.87-0.07,8.1c-2.24,2.24-5.84,2.23-8.05-0.01l-9.7-9.83 l-9.72,9.85c-2.22,2.26-5.84,2.27-8.07,0.02c-2.23-2.24-2.24-5.89-0.02-8.15l9.75-9.89l-9.76-9.9c-2.2-2.24-2.17-5.87,0.07-8.1 c2.24-2.24,5.84-2.23,8.05,0.01l9.7,9.83L83.95,24.11L83.95,24.11z M111.56,6.62H41c-6.15,0-13.3,10.07-21.06,20.98 c-3.55,5-7.22,10.17-11.1,14.77c3.19,3.81,6.33,8.33,9.51,12.89c7.48,10.74,15.18,21.8,22.34,22.38h70.87 c1.29,0,2.46-0.53,3.31-1.38c0.85-0.85,1.38-2.03,1.38-3.31V11.32c0-1.29-0.53-2.46-1.38-3.32C114.02,7.15,112.85,6.62,111.56,6.62 L111.56,6.62z"/></g></svg>`
      cancel.className='cancel'
      
      const dbl_zero   =document.createElement('button')
      dbl_zero.textContent ='00'
      dbl_zero.className='_00_'
      
      con.append(dbl_zero,zero,cancel,play)
      this.main_container.appendChild(con)
      arr.push(zero,dbl_zero,play,cancel)
    }
    
    boxes()
    btns()
    return arr
  }
  #turn_on_btns_4(){
    const btns              = this.#create_ui_4()
    let listeners           ={
      '_0_':null,
      '_1_':null,
      '_2_':null,
      '_3_':null,
      '_4_':null,
      '_5_':null,
      '_6_':null,
      '_7_':null,
      '_8_':null,
      '_9_':null,
      '_00_':null,
      'play':null,
      'cancel':null
    }
    /*Problems+Solves:-
        🧐 خزنا في الاوبجيكت ديباتش دوال عشان لما دالة cancel_all تمسح تعرف هي بتمسح انهي الدالة
*/

    //functions
    function turn_on(btn){
      if(listeners[btn.className]){
        return;
      }
          
          
      const do_this =()=>{
        if( btn.classList.contains('cancel') ){
            insert('del')
        }else if( btn.classList.contains('play') ){
          //do what?!?
          
        }else{
          insert(btn.textContent)
        }
      }
      btn.addEventListener('click',do_this)
      listeners[btn.className]=do_this
          
    /*Problems+Solves:-
          (1)مشكلة تكرار هذه الدالة
          🤔بعني عندك( لوب الي تحت + دالة cancel_all ) هما الي بينفذو الدالة دي
          👉عشان كدا تلاقي الليستينر بيتكرر مرتين
          👉 عذان كدا الضغطة === ضغتين
          🧐 عملنا اوبجيكت ديباتش عشان cancel_all تمسح منو
*/
    }
    const insert  =(value)=>{
      const small_sec = this.dom.shape_4.box_s
      const small_min = this.dom.shape_4.box_m
      const small_hou = this.dom.shape_4.box_h
      let array       =[
        ...small_hou.textContent,
        ...small_min.textContent,
        ...small_sec.textContent].filter(x=> x !=='_')
      
      function re(){
        small_sec.textContent=''
        small_min.textContent=''
        small_hou.textContent=''
        for(let s = array.length ; s > 0 ; s--){
          if( small_sec.textContent.length < 2 ){
            small_sec.textContent = array[s-1] + small_sec.textContent
          }else if( small_min.textContent.length < 2 ){
            small_min.textContent = array[s-1] + small_min.textContent
          }else{
            small_hou.textContent = array[s-1] + small_hou.textContent
          }
        }
            
            
        small_hou.textContent = small_hou.textContent.padStart(2,'_');
        small_min.textContent = small_min.textContent.padStart(2,'_');
        small_sec.textContent = small_sec.textContent.padStart(2,'_');
      }
            
      if( value === 'del' ){
        array.pop()
        re()
        return;
      }
      if(array.length < 6){
        array.push(value)
        re()
      }
          
    /*problems + solve it:-
          (1)Array:-
          -كنا بنضيف كدا  👉 array=[ small_sec , small_min , small_hou ]
          🤔واخد بالك ان هنا انت بتحط قيمة كاملة يا غير ( يعتي ممكن هنا small_sec يكون رقمين)
          🧐هنا استخدمنا spread operator عشان نحل المشكلة
          
          
          (2)لما كنا بنلف جوا اللوب كنا بنمسح العنصر الي بنضيفه (مع العلم ان احنا كدا كنا بنفضي الليست اصلا )
          🤔يسطا اللوب بدا اصلا على عدد معين و انت مينفعش تقولو غير العدد و هو شغال اصلا
          🧐قولنالو امسح مرة واحدة بعدين ظبط الاماكن
          
          (3)اضافة العدد جوا اللوب
          🤔يسطا انت فوق كنت بتقولو ضيف العدد الاخير بس باستخدام دي 👉 +=
          🤔ركز فيها هتلاقيك بتعكس رقم
          🧐🔥دي ( = ) بتضيف الارقام مظبوطة  // دي ( += ) بتضيف من الارقام معكوسة
          
*/
    }
    for(let the_btn of btns){
      turn_on(the_btn)
    }
  }
  #shape_4(){
    this.#turn_on_btns_4()
  }
  
         
         
  #create_container(){
            this.container = document.createElement('div')
            const shape={
              '1':'con_1',
              '2':'con_2',
              '3':'con_3',
              'default':'con_def'
            }
            this.container.className = shape[this.shape] || shape.default
          }
  #create(){
            switch(this.shape){
              case '1':
                this.#shape_1()
                break;
              case '2':
                this.#shape_2()
                break;
              case '3':
                this.#shape_3()     
                break;
              case '4':
                this.#shape_4()
                break;
              default:
                this.container.textContent = 'Check parameter in Class Calling'
                this.main_container.appendChild(this.container)
            }
          }
          
  static call(kind){
            return new timerUI(kind)
          }
}

export {timerLogic,timerUI}
