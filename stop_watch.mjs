class timerLogic{
  constructor(){
            this.otu = true
            this.all_time
            this.full_width
          }
          
  static deg(index,x,y,cx,cy){
            let deg = (Math.atan2(y-cy,x-cx)*(180/Math.PI) )+90
            if(index === 0 ){
              if(deg < 0) deg +=360
              return Math.round((deg%360)/30)*30
            }
            
            if(deg < 0) deg +=360
            return (deg % 360)
          }
  static info(item){
            const info = item.getBoundingClientRect()
            return {
              'client_rect' : info,
              'cX'          : info.left + (info.width/2),
              'cY'          : info.top  + (info.height/2),
              'r'           : info.width/2
            }
          }
  static min_sec(deg){
            return  Math.trunc((deg/360)*60)
          }
  static extract_value(item){
            //shape_3
            
            const check = item.textContent.match(/[0-9]/g)
              
            return check ? Number( check.join('') ) : 0
          }
  static print(box,result){
            //shape 3
            box.textContent =     result === 0 ? '__' : result.toString().padStart(2,'_')
          }
  static calculate(h,m,s){
    let total
    //if contains underScore
    if(/_/.test(h.textContent) || /_/.test(m.textContent) || /_/.test(s.textContent) ){
      h = timerLogic.extract_value(h)
      m = timerLogic.extract_value(m)
      s = timerLogic.extract_value(s)
      total = h+m+s
    }else{
      total = ( Number(h.textContent)*3600 ) + ( Number(m.textContent)*60 ) + ( Number(s.textContent) )
    }
    return {
              'total'  :total,
              'h'      :Math.floor(total / 3600) % 24,
              'm'      :Math.floor(total / 60) % 60,
              's'      :Math.floor(total) % 60
            }
  }
}

class timerUI{
  constructor(kind,the_container){
           this.dom={
             'shape_1':{},
             'shape_2':{},
             'shape_3':{},
             'shape_4':{}
           }
           this.shape= kind ? kind.toString() : 'default'
           this.container
           this.main_container = the_container
           this.logic = new timerLogic()
           //this.alone = the_container.children.length === 0 ? true : false
           this.#create_container()
           this.#create()
           this.interval
           
          }
          
  //shape 1
  #shape_1(){
            const line = document.createElement('div')
            this.dom.shape_1.line= line
            line.classList.add('line')
            
            const inside_line = document.createElement('small')
            this.dom.shape_1.inside_line = inside_line
            inside_line.className = 'inside_line'
            line.appendChild(inside_line)
            
            const side_line = document.createElement('div')
            this.dom.shape_1.side_line = side_line
            side_line.className='side_line'
            
            const h = document.createElement('div')
            this.dom.shape_1.side_h = h
            h.classList.add('side_box','side_h')
            h.textContent ='Hour'
            
            const m = document.createElement('div')
            this.dom.shape_1.side_m = m
            m.classList.add('side_box','side_m')
            m.textContent ='Min'
            
            const s = document.createElement('div')
            this.dom.shape_1.side_s = s
            s.classList.add('side_box','side_s')
            s.textContent ='Sec'
            
            const array=[h,m,s]
            
            side_line.append(h,m,s)
            side_line.addEventListener('click',(e)=>{
              array.forEach( item=>{
                item.classList.remove('selected')
                if(e.target.closest('.side_box')){
                  e.target.classList.add('selected')
                }
              })
            })
            side_line.addEventListener('dblclick',(e)=>{
              if(e.target.classList.contains('side_box')){
                e.target.textContent='0'
              }
            })
            this.#final_shape()
            this.container.append(line,side_line)
            this.main_container.append(this.container)
          }
  #clock_body(){
            const exist = this.dom.shape_1.clock
            if( exist ){
              return exist
            }
            const timer       = document.createElement('div')
            timer.className   ='clock'
            timer.style.width ='230px'
            timer.style.height='230px'
            this.dom.shape_1.clock = timer
            this.container.appendChild(timer)
            return timer
          }
  #create_numbers(){
            const numbers =[]
            const timer =this.#clock_body()
            for(let c=0 ; c < 12 ; c++ ){
              const new_num= document.createElement('small')
              new_num.classList.add(`num_${c+1}`,'number')
              new_num.textContent = c+1
              
              numbers.push(new_num)
              timer.appendChild(new_num)
            }
            return numbers
          }
  #final_shape(){
            this.#clock_hands()
            const array = this.#create_numbers()
            for( let d=0 ; d < 12 ; d++ ){
              const num= array[d]
              const deg=( (360/12) * (d+1) )-90
              const rad=deg * Math.PI /180
              num.style.transform=`translate(-50%,-50%) translate(${Math.cos(rad) * 100}px,${Math.sin(rad) * 100}px)`
            }
            this.#please_write_1()
          }
  #clock_hands(){
            const timer  =this.#clock_body()
            const ele    = document.createElement('div')
            const dot    = document.createElement('div')
            const circle = document.createElement('div')
            
            const pro    = {
              'class':'hand',
              'height':25,
              'rotate':270,
              'color':'blue'
            }
            
            dot.className   ='dot'
            circle.className='h_circle'
            ele.appendChild(circle)
            timer.appendChild(dot)
            
            
            ele.style.height   =` ${115 - pro.height}px`
            ele.className      = pro.class
            ele.style.transform=`translateX(-50%)`
            dot.append(ele)
            this.dom.shape_1.circle= circle
            this.dom.shape_1.hand = ele
            
            this.dom.shape_1.dot = dot
          }
  #play_shape_1(){
            const line       = this.dom.shape_1.inside_line
            const h_box      = this.dom.shape_1.side_h
            const m_box      = this.dom.shape_1.side_m
            const s_box      = this.dom.shape_1.side_s
            const full_width = document.querySelector('.line').offsetWidth
            
            let info = timerLogic.calculate(h_box,m_box,s_box)
            let full_time = info.total
            let sum = info.total
            
            const rend =(ele,total,full_time,full_width)=>{
              h_box.textContent = Math.floor(total / 3600) % 24
              m_box.textContent = Math.floor(total / 60) % 60
              s_box.textContent = Math.floor(total) % 60
              
              full_width ? ele.style.width = `${(total / full_time) * full_width}px` : null
            }
            
            this.interval = setInterval(()=>{
              if(sum > 0){
                sum--
                console.log(sum)
              }else{
                console.log('Fire In The Hole')
                clearInterval(this.interval)
              }
              
              //render
              rend(h_box,sum)
              rend(m_box,sum)
              rend(s_box,sum)
              rend(line,sum,full_time,full_width)
            },1000)
          }
  #please_write_1(){
            const h         = this.dom.shape_1.hand
            const circle    = this.dom.shape_1.circle
            const the_clock = this.dom.shape_1.clock
            const h_box     = this.dom.shape_1.side_h
            const m_box     = this.dom.shape_1.side_m
            const s_box     = this.dom.shape_1.side_s
            const boxes     = [h_box,m_box,s_box]
            
            let current
            let centerX
            let centerY
            let r
            
            let deg
            let x
            let y
            
            //functions
            const selected= ()=>{
              for(let box of boxes){
                if(box.classList.contains('selected')){
                  current = boxes.indexOf(box)
                }
              }
              !current ? current=0 : null
            }
            
            
            //listeners
            circle.addEventListener('touchstart',()=>{
              const info = timerLogic.info(the_clock)
              centerX    = info.cX
              centerY    = info.cY
              r          = info.r
              selected()
            })
            circle.addEventListener('touchmove',(e)=>{
              e.preventDefault()
              requestAnimationFrame(()=>{
                x   = e.touches[0].clientX
                y   = e.touches[0].clientY
                deg = timerLogic.deg(current,x,y,centerX,centerY)
                
                h.style.transform=`translate(-50%,0%) rotate(${deg}deg)`
              })
            })
            circle.addEventListener('touchend',()=>{
              if(current === 0){
                h_box.textContent = Math.round(deg/30)
                deg = timerLogic.deg(current,x,y,centerX,centerY)
                if(deg === 0 || deg === 360) h_box.textContent = '12'
                current++
                return;
              }
              if(current < 3){
                const info = timerLogic.min_sec(deg)
                boxes[current].textContent = info
                current++
              }
              
              
              
              //start permision
              let start = 0
              for(let box of boxes){
                if( Number(box.textContent) || box.textContent === '0'){
                  start++
                }
              }
              if(start === 3){
                circle.style.pointerEvents='none'
                circle.style.background='blue'
                this.#play_shape_1()
              }
            })
          }
          
          
  //shape 2
  #shape_2(){
            const screen = this.#show_box()
            const btns   = this.#btns()
            this.container.append(screen,btns)
            this.main_container.appendChild(this.container)
            this.#please_write_2()
          }
  #btns(){
            //btns container
            const container = document.createElement('div')
            container.className='btns_con'
            const all_btns =[]
            //btns
            for(let f=0 ; f < 11 ; f++){
              const num = document.createElement('button')
              num.classList.add('btn')
              num.textContent = f+1
              if( f === 9 ){
                num.textContent='Start'
                num.style.gridColumnStart='1'
                num.style.gridColumnEnd  ='3'
                num.className='play'
              }
              if( f === 10 ){
                num.textContent='del'
                num.style.gridColumnStart='3'
                num.style.gridColumnEnd  ='4'
                num.className='del'
              }
              container.appendChild(num)
              all_btns.push(num)
            }
            
            this.dom.shape_2.btns_con = container
            return container
  }
  #show_box(){
            const box = document.createElement('small')
            box.classList.add('show_box')
            this.dom.shape_2.show_box = box
            return box
          }
  #please_write_2(){
            const btns_con   = this.dom.shape_2.btns_con
            const box        = this.dom.shape_2.show_box
            const array      = box.textContent.split('')
            btns_con.addEventListener('click',(e)=>{
              if( e.target.closest('.del') && array.length > 0){
                array.pop()
                box.textContent = array.join('')
                return;
              }
              if( e.target.closest('.btn') && array.length < 5 && array.join('') < 9999 ){
                array.push( e.target.textContent.toString() )
                box.textContent = array.join('')
              }
            })
          }
          
          
  //shape 3
  //textContent
  #shape_3(){
            const child = this.#box()
            const btns  = this.#plus_minus()
            const start = this.#start_btn()
            
            this.container.append(child,btns,start)
            this.main_container.appendChild(this.container)
            
            this.#play()
          }
  #box(){
            const box = document.createElement('div')
            box.classList.add('view')
            
            const h = document.createElement('small')
            h.classList.add('h_box','box')
            const m = document.createElement('small')
            m.classList.add('m_box','box')
            const s = document.createElement('small')
            s.classList.add('s_box','box')
            
            for(let ele of [h,m,s]){
              
              ele.textContent = '__'
            }
            
            box.append(h,m,s)
            
            this.dom.shape_3.view  =box
            this.dom.shape_3.h_box =h
            this.dom.shape_3.m_box =m
            this.dom.shape_3.s_box =s
            
            return box
          }
  #plus_minus(){
            const container = document.createElement('div')
            const plus      = document.createElement('button')
            const minus     = document.createElement('button')
            
            container.className='con_btns_sh3'
            
            plus.textContent = '+'
            minus.textContent= '-'
            
            plus.classList.add('btn_shape_3','plus')
            minus.classList.add('btn_shape_3','minus')
            
            container.append(plus,minus)
            
            this.dom.shape_3.plus    =plus
            this.dom.shape_3.minus   =minus
            this.dom.shape_3.btns_con=container
            return container
          }
  #start_btn(){
            const btn = document.createElement('button')
            btn.classList.add('start_count')
            btn.textContent = 'Start'
            this.dom.shape_3.start = btn
            return btn
          }
  #play(){
            const start = this.dom.shape_3.start
            
            const boxes ={
              'h':this.dom.shape_3.h_box,
              'm':this.dom.shape_3.m_box,
              's':this.dom.shape_3.s_box
            }
            const array = Object.values(boxes)
            let sum     = timerLogic.calculate(boxes.h,boxes.m,boxes.s).total
            let timer
            
            
            const lets_go     =()=>{
              start.textContent = 'Stop'
              array.map( item=>item.classList.remove('selected'))
              timer = setInterval(start_count,1000)
              return;
            }
            const stop        =()=>{
              console.log('Fire In The Hole(3)')
              start.textContent ='Start'
              clearInterval(timer)
              timer = null
            }
            const start_count =()=>{
              
              
              if(sum === 0){
                stop()
                return;
              }else{
                sum--
              }
              const final_h  = Math.floor(sum/3600) % 24
              const final_m  = Math.floor(sum / 60) % 60
              const final_s  = Math.floor(sum % 60)
              console.log(final_h,final_m,final_s)
              timerLogic.print(boxes.h,final_h)
              timerLogic.print(boxes.m,final_m)
              timerLogic.print(boxes.s,final_s)
            }
            start.addEventListener('click',()=>{
              if(start.textContent === 'Start'){
                lets_go()
                return;
              
              }else{
                stop()
              }
            })
            
            //draw shape 3
            this.#please_write_3()
          }
  #please_write_3(){
            let sum
            let current =null
            const container= this.dom.shape_3.view
            const plus_btn = this.dom.shape_3.plus
            const minus_btn= this.dom.shape_3.minus
            const boxes    = {
              's' : this.dom.shape_3.s_box,
              'm' : this.dom.shape_3.m_box,
              'h' : this.dom.shape_3.h_box
            }
            const items    = Object.values(boxes)
            const plus         =()=>{
              if(current === null){
                sum = total()
                sum +=1
                render(sum)
                return;
              }
              
              let result   = timerLogic.extract_value(items[current])
              result++
              current !== 2 ? result %= 60 : result %= 24
              render(result,items[current])
            }
            const minus        =()=>{
              if(current === null){
                sum = total()
                if(sum > 0){
                  sum--
                }else if(sum === 0){
                  console.log('Out Range')
                }
                render(sum)
                return;
              }
              
              let result = timerLogic.extract_value(items[current])
              if(result > 0){
                result--
              }else if(result === 0){
                if(current+1 < 3){
                  result = timerLogic.extract_value(items[current+1])
                  result--
                  render(59,items[current])
                  render(result,items[current+1])
                  return;
                }
                console.log('out range')
              }
              render(result,items[current])
            }
            const cancel_others=()=>{
              items.forEach( it=>{
                it.classList.remove('selected')
              })
            }
            const change       =(e)=>{
              const box = e.target.closest('.box')
              if( box ){
                cancel_others()
                
                box.classList.add('selected')
                
                current = items.indexOf(box)
              
              }else{
                cancel_others()
                current = null
              }
            }
            const total        =()=>{
              const h_value = timerLogic.extract_value(boxes.h)
              const m_value = timerLogic.extract_value(boxes.m)
              const s_value = timerLogic.extract_value(boxes.s)
              return (h_value*3600) + (m_value*60) + s_value
            }
            const render       =(result,box)=>{
              if(box){
                
                box.textContent = result.toString().padStart(2,'_')
                return;
              }
              
              sum = result
              const info = timerLogic.calculate(boxes.h,boxes.m,boxes.s)
              const h    = info.h
              const m    = info.m
              const s    = info.s
              
              timerLogic.print(boxes['h'],h)
              timerLogic.print(boxes['m'],m)
              timerLogic.print(boxes['s'],s)
            }
            plus_btn.addEventListener('click',plus)
            minus_btn.addEventListener('click',minus)
            container.addEventListener('click',change)
          }
  
  //shape 4
  #create_ui_4(){
    const arr =[]
    const boxes  =()=>{
      const names=['h','m','s']
      const time_box = document.createElement('div')
      time_box.className='flame'
      
      for(let s=0 ; s < 3 ; s++){
        const small = document.createElement('small
