class ProgressBar{
    constructor({
                    type = 'bar',
                    container = '#progress_bar',
                    background = '#708090',
                    foreground = '#1E90FF',
                    complete = () => console.log('ProgressBar Complete!')
                })
    {
        //info
        this.ring_once = true;
        this.type = type;
        this.background = background;
        this.foreground = foreground;
        this.container = container;
        this.value = 0;
        this.callback = ()=>complete();
        document.querySelector(this.container).innerHTML = `<div ></div>`;
        const str = this.container + '>div';
        this.dom = document.querySelector(str);
        this.render();
    }
    render(){
        //set HTML
        this.dom.setAttribute('type' ,this.type);
        let str = '';
        //different type
        switch (this.type){
            case 'ring':
                this.dom.innerHTML = `<div class = "ProgressBar_ring4">
                                        <div class = "ProgressBar_ring3"></div>
                                        <div class = "ProgressBar_ring2"></div>
                                        <div class = "ProgressBar_ring1"></div>
                                      </div>`;
                str = this.container + " .ProgressBar_ring4";
                document.querySelector(str).style.backgroundColor = this.foreground;
                str = this.container + " .ProgressBar_ring3";
                this.ring3 = document.querySelector(str);
                document.querySelector(str).style.backgroundColor = this.background;
                str = this.container + " .ProgressBar_ring2";
                document.querySelector(str).style.backgroundColor = this.background;
                break;
            case 'hourglass':
                this.dom.innerHTML = `<div class = "ProgressBar_hourglass2">
                                        <div class = "ProgressBar_hourglass1"></div>
                                      </div>`;
                str = this.container + " .ProgressBar_hourglass2";
                document.querySelector(str).style.borderTopColor = this.background;
                document.querySelector(str).style.borderBottomColor = this.foreground;
                str = this.container + " .ProgressBar_hourglass1";
                document.querySelector(str).style.borderBottomColor = this.background;
                document.querySelector(str).style.borderTopColor = this.foreground;
                break;
                //'bar' and other invalid input type
            default:
                this.dom.innerHTML = `<div class = "ProgressBar_bar2"><div class = "ProgressBar_bar1"></div></div>`;
                str = this.container + " .ProgressBar_bar1";
                document.querySelector(str).style.backgroundColor = this.foreground;
                str = this.container + " .ProgressBar_bar2";
                document.querySelector(str).style.backgroundColor = this.background;
                break;
        }
    }

    set_progress(set_value){
        if (set_value < 0 || set_value > 100) return null;
        this.value = set_value;
        let str='';
        switch(this.type)
        {
            case 'ring':
                str = this.container + " .ProgressBar_ring2";
                document.querySelector(str).style.transform = `rotate(${set_value / 100 * 360}deg)`;
                document.querySelector(str).style.transitionDuration = '500ms';
                if(this.ring_once && this.value > 50){
                    document.querySelector(str).style.transitionDuration = '0ms';
                    this.ring_once = false;
                    this.ring3.style.backgroundColor = this.foreground;
                    this.ring3.style.borderRadius='0 60px 60px 0';
                    this.ring3.style.left='60px';
                }
                str = this.container + " .ProgressBar_ring1";
                document.querySelector(str).innerHTML=`${set_value}%`;
                break;
            case 'hourglass':
                str = this.container + " .ProgressBar_hourglass1";
                document.querySelector(str).style.borderWidth=`${Math.round(6*Math.sqrt(100 - set_value))}px 
                ${Math.round(2*Math.sqrt(100 - set_value))}px ${Math.round(6*Math.sqrt(100 - set_value))}px`;
                document.querySelector(str).style.left = `-${Math.round(2*Math.sqrt(100 - set_value))}px`;
                document.querySelector(str).style.top = `-${Math.round(6*Math.sqrt(100 - set_value))}px`;
                break;
            default:
                str = this.container + " .ProgressBar_bar1";
                document.querySelector(str).style.width = `${set_value}%`;
                break;
        }
        if (this.value === 100)
            this.callback();
    }
}
