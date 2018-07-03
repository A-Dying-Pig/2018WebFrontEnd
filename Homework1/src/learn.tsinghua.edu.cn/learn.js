//const values
var type_total_number = 2;
var file_class_total_number = 2;
var msg_total_number = 2;
var cur_file_table = 1;


//controls
function div1_msg_onclick(i){
    document.getElementById("div1_msg" + i).style.display = "block";
    document.getElementById("div1_table1").style.display = "none";
    document.getElementById("msg_state"+i).textContent = "已读";
    document.getElementById("AllRead").style.display = "none";
}

function  div1_back_onclick(i) {
    document.getElementById("div1_table1").style.display = "table";
    document.getElementById("div1_msg" + i).style.display = "none";
    document.getElementById("AllRead").style.display="inline";
}

function div1_msg_AllRead(){
    for (var z = 1; z <=msg_total_number; z++)
        document.getElementById("msg_state"+z).textContent = "已读";
}
//click the types
function type_onclick(i)
{
    for (var p = 1; p <= msg_total_number; p++)
        div1_back_onclick(p);
    file_class_onclick(1);
    for (var z = 1; z <= type_total_number; z++)
    {
        if (z == i)
        {
            document.getElementById("type" + z).style.color = "#EE7621";
            document.getElementById("type" + z).style.textDecoration = "underline";
            document.getElementById("div" + z).style.display = "block";
        }
        else
        {
            document.getElementById("type" + z).style.color = "#242424";
            document.getElementById("type" + z).style.textDecoration = "none";
            document.getElementById("div" + z).style.display = "none";
        }
    }
}

function file_class_onclick(i) {
    for (var z = 1; z <= file_class_total_number; z++)
    {
        if (z == i)
        {
            cur_file_table = i;
            document.getElementById("class" + z).style.border = "2px inset #FFA500";
            document.getElementById("class" + z).style.fontSize = "0.8em";
            document.getElementById("table_class" + z).style.display = "table";
        }
        else
        {
            document.getElementById("class"+z).style.border = "2px outset #828282";
            document.getElementById("class" + z).style.fontSize = "1.1em";
            document.getElementById("table_class" + z).style.display = "none";
        }
    }
}

function div2_table_file_onclick(i,j)
{
    var str = "body div#div2 table#table_class"+i+" tr:nth-of-type("+j+") td.td6";
    document.querySelector(str).textContent = "已下载";
}

function DownloadAllNewFiles()
{
    var str = "body div#div2 table#table_class"+cur_file_table+" td.td1";
    var len = document.querySelectorAll(str).length;
    //console.log(len);
    for (var z = 1; z<=len; z++)
        div2_table_file_onclick(cur_file_table,z);

}

var ascending = [true,true,true,true,true,true];
var index_name=["0","number","title","description","file_size","upload_time","file_state"];

function file_table_sort(table_index,index)
{
    var str = "body div#div2 table#table_class"+table_index+" td.td1";
    var len = document.querySelectorAll(str).length;
    var tds = new Array(len);
    //extract value from the table
    for (var z = 1; z<= len;z++)
    {
        tds[z-1] = new Object(6);
        str = "body div#div2 table#table_class"+table_index+" tr:nth-of-type("+z+") td";
        var temp = document.querySelectorAll(str);
        tds[z - 1]["number"] = temp[0].innerHTML;
        tds[z - 1]["title"] = temp[1].innerHTML;
        tds[z - 1]["description"] = temp[2].innerHTML;
        tds[z - 1]["file_size"]= temp[3].innerHTML;
        tds[z - 1]["upload_time"] = temp[4].innerHTML;
        tds[z - 1]["file_state"] = temp[5].innerHTML;
    }
    //sort--first time:ascending; next time:descending
    tds.sort(function (a, b) {
        if (ascending[index]){
            if (a[index_name[index]] > b[index_name[index]]) return 1;
            else return -1;
        }
        else {
            if (a[index_name[index]] > b[index_name[index]]) return -1;
            else return 1;
        }
    });
    //write_back to the table
    for (var z = 1; z <= len;z++)
    {
        str = "body div#div2 table#table_class"+table_index+" tr:nth-of-type("+z+") td";
        var temp = document.querySelectorAll(str);
        temp[0].innerHTML = tds[z - 1]["number"];
        temp[1].innerHTML = tds[z - 1]["title"];
        temp[2].innerHTML = tds[z - 1]["description"];
        temp[3].innerHTML = tds[z - 1]["file_size"];
        temp[4].innerHTML = tds[z - 1]["upload_time"];
        temp[5].innerHTML = tds[z - 1]["file_state"];
    }

    if(ascending[index]) ascending[index] = false;
    else ascending[index] = true;
}