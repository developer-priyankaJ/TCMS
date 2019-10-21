
function f_calc(n)
{
        if(n=='ce')
        {
                this.init_calc();
        }
        else if(n=='=')
        {
                if(this.calc_array[0]!='=' && this.calc_array[1]!=1)
                {
                        eval('this.calcul='+this.calc_array[2]+this.calc_array[0]+this.calc_array[3]+';');
                        this.calc_array[0] = '=';
                        this.refs.resultRef.value=this.calcul;
                        this.calc_array[2]=this.calcul;
                        this.calc_array[3]=0;
                }
        }
        else if(n=='+-')
        {
                this.refs.resultRef.value=this.refs.resultRef.value*(-1);
                if(this.calc_array[0]=='=')
                {
                        this.calc_array[2] = this.refs.resultRef.value;
                        this.calc_array[3] = 0;
                }
                else
                {
                        this.calc_array[3] = this.refs.resultRef.value;
                }
                this.pas_ch = 1;
        }
        else if(n=='nbs')
        {
                if(this.refs.resultRef.value<10 && this.refs.resultRef.value>-10)
                {
                        this.refs.resultRef.value=0;
                }
                else
                {
                        this.refs.resultRef.value=this.refs.resultRef.value.slice(0,this.refs.resultRef.value.length-1);
                }
                if(this.calc_array[0]=='=')
                {
                        this.calc_array[2] = this.refs.resultRef.value;
                        this.calc_array[3] = 0;
                }
                else
                {
                        this.calc_array[3] = this.refs.resultRef.value;
                }
        }
        else
        {
                        if(this.calc_array[0]!='=' && this.calc_array[1]!=1)
                        {
                                eval('this.calcul='+this.calc_array[2]+this.calc_array[0]+this.calc_array[3]+';');
                                this.refs.resultRef.value=this.calcul;
                                this.calc_array[2]=this.calcul;
                                this.calc_array[3]=0;
                        }
                        this.calc_array[0] = n;
        }
        if(this.pas_ch==0)
        {
                this.calc_array[1] = 1;
        }
        else
        {
                this.pas_ch=0;
        }
        this.refs.resultRef.focus();
        return true;
}
function add_calc(n)
{
        if(this.calc_array[1]==1)
        {
                this.refs.resultRef.value=n;
        }
        else
        {
                this.refs.resultRef.value+=n;
        }
        if(this.calc_array[0]=='=')
        {
                this.calc_array[2] = this.refs.resultRef.value;
                this.calc_array[3] = 0;
        }
        else
        {
                this.calc_array[3] = this.refs.resultRef.value;
        }
        this.calc_array[1] = 0;
        this.refs.resultRef.focus();
        return true;
}

function key_detect_calc(evt)
{
        if((evt.keyCode>95) && (evt.keyCode<106))
        {
                var nbr = evt.keyCode-96;
                add_calc.call(this,nbr);
        }
        else if((evt.keyCode>47) && (evt.keyCode<58))
        {
                var nbr = evt.keyCode-48;
                add_calc.call(this,nbr);
        }
        else if(evt.keyCode==107)
        {
                f_calc.call(this,'+');
        }
        else if(evt.keyCode==109)
        {
                f_calc.call(this,'-');
        }
        else if(evt.keyCode==106)
        {
                f_calc.call(this,'*');
        }
        else if(evt.keyCode==111)
        {
                f_calc.call(this,'');
        }
        else if(evt.keyCode==110)
        {
                add_calc.call(this,'.');
        }
        else if(evt.keyCode==190)
        {
                add_calc.call(this,'.');
        }
        else if(evt.keyCode==188)
        {
                add_calc.call(this,'.');
        }
        else if(evt.keyCode==13)
        {
                f_calc.call(this,'=');
        }
        else if(evt.keyCode==46)
        {
                f_calc.call(this,'ce');
        }
        else if(evt.keyCode==8)
        {
                f_calc.call(this,'nbs');
        }
        else if(evt.keyCode==27)
        {
                f_calc.call(this,'ce');
        }
        return true;
}


export default {
    key_detect_calc,
    f_calc,
    add_calc
}
