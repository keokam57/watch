export function the_watch(main_container){
  
  const create_items =()=>{
    const watch_machine=()=>{
      const con = document.createElement('div')
      con.className='watch'
      
      for(let r = 1 ; r < 13 ; r++){
        const num = document.createElement('div')
        num.innerText=`${r}`
        num.classList.add(`rive_${r}`,'rive')
        con.appendChild(num)
        
        for(let i = 0 ; i < 5 ; i++){
          const inner = document.createElement('div')
          inner.className='bet'
          inner.textContent = '|'
          con.appendChild(inner)
        }
      }
      
      const cyrcle  = document.createElement('div')
      cyrcle.className='center'
      
      const hours   = document.createElement('div')
      hours.classList.add('hour','hour_line')
      
      const minutes = document.createElement('div')
      minutes.classList.add('minute','min_line')
      
      const seconds = document.createElement('div')
      seconds.classList.add('sec','sec_line')
      
      cyrcle.append(hours,minutes,seconds)
      con.appendChild(cyrcle)
      main_container.appendChild(con)
    }
    const time_box     =()=>{
      const con = document.createElement('div')
      con.className='time_box'
      
      const arr =['hour','min','sec']
      
      for(let f = 0 ; f < 3 ; f++){
        const box = document.createElement('small')
        box.classList.add(`${arr[f]}_box`,'time_border')
        con.appendChild(box)
      }
      
      main_container.appendChild(con)
    }
    
    watch_machine()
    time_box()
  }
      create_items()
    
        let animationFrame
        const watch        = main_container.querySelector('.watch')
        const time_box     = main_container.querySelector('.time_box')
        const ab3ad        = watch.getBoundingClientRect().width
        const hourSize     = main_container.querySelector('.rive').getBoundingClientRect().height
        const nq           = (ab3ad / 2) - (hourSize/2)
        
        const hour_line    = main_container.querySelector('.hour_line')
        const min_line     = main_container.querySelector('.min_line')
        const sec_line     = main_container.querySelector('.sec_line')
        
        const hour_box    = main_container.querySelector('.hour_box')
        const min_box     = main_container.querySelector('.min_box')
        const sec_box     = main_container.querySelector('.sec_box')
        
        const lines        = Array.from( main_container.querySelectorAll('.bet') )
        
        
    //functions
        function toRad(deg){
          return deg * Math.PI / 180;
        }
        
    // توزيع الارقام على دائرة
        for(let num=0 ; num<12 ; num++){
          const deg          = (360/12)*(num+1)-90
          main_container.querySelector(`.rive_${num+1}`).style.transform=` translate(-50%,-50%)  translate(${Math.cos(toRad(deg))*nq}px,${Math.sin(toRad(deg))*nq}px)`
        }
        //توزيع الخطوط
        for(let line=0 ; line < 60 ; line++){
          if( line % 5 === 0){
            lines[line].style.opacity='0'
          }
          const line_deg =( (360/60)*line )-90
          lines[line].style.transform=`translate(-50%,-50%)  translate(${Math.cos(toRad(line_deg))*(nq+8)}px,${Math.sin(toRad(line_deg))*(nq+8)}px) rotate(${line_deg+90}deg)`
        }
        
        
    //turn on
        function move(){
          const datom =new Date()
          
          //Time Box
          if(datom.getHours() > 12){
            hour_box.textContent=datom.getHours() - 12
          }else{
            hour_box.textContent=datom.getHours()
          }
          min_box.textContent=datom.getMinutes()
          sec_box.textContent=datom.getSeconds()
          
          
          
          //seconds rotate
          const current_sec  = datom.getSeconds()
          const cur_sec_theta= (360/60)*current_sec
          sec_line.style.transform=`
          translate(0,-100%)
          rotate(${cur_sec_theta}deg)`
          
          //minutes rotate
          const current_minute=datom.getMinutes()
          const cur_min_theta =(360/60)*current_minute
          min_line.style.transform=`
          rotate(${cur_min_theta}deg)
          translate(0,-100%)`
          
          //hour skew
          const current_hour   =datom.getHours()
          const cur_hour_theta =(360/12)*current_hour
          const add_rotate     =0.5*current_minute
          hour_line.style.transform=`
          translate(0,-100%)
          rotate(${cur_hour_theta+add_rotate}deg)`
          
          
          animationFrame= requestAnimationFrame(move)
        }
        move()
          }
