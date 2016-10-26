// ==UserScript==
// @name         SNH48 Get Ticket for 48.cn
// @namespace    https://github.com/fanpaa/SNH48-Get-Ticket-For-48cn
// @version      0.2
// @description  SNH48新官方商城抢票脚本
// @author       fanpaa
// @match        http://shop.48.cn/tickets/item/*
// @grant        none
// ==/UserScript==

$(function() {
    'use strict';

    console.info('===>link start!');

    //设置购买数量
    var _num=1;
    //设置购买座位  2vip 3普 4站
    var _seattype=2;
    //设置循环间隔
    var _time=500;



    var _url= "/TOrder/add";
    var _id=location.pathname.split('/tickets/item/')[1];

    function _loop(){
        layer.msg('抢票中 0rz...');
        setTimeout(function(){tickets();},_time);
    }


    function tickets(){
        var __id =_id;
        var __url= "/TOrder/tickCheck";
        $.ajax({
            url: __url,
            type: "post",
            dataType: "json",
            data: { id: __id,r: Math.random() },
            success: function (result) {
                if (result.HasError) {
                    _loop();
                }
                else
                {
                    switch(result.ErrorCode)
                    {
                        case "success":
                            window.location.href = result.ReturnObject;
                            break;
                        case "fail":
                            layer.msg(result.Message);
                            console.info('/TOrder/tickCheck 失败');
                            break;
                        default:
                            _loop();
                    }

                }
            },
            error: function (e) {
                _loop();
                console.info('/TOrder/tickCheck Error');

            }
        });
    }


    function init(){
        $.ajax({
            url: _url,
            type: "post",
            dataType: "json",
            data: { id: _id, num: _num, seattype:_seattype, r: Math.random(), brand_id:$('body script').text().match(/brand_id:(\d+)/)[1] },
            success: function (result) {
                if (result.HasError) {
                    //失败操作
                    layer.msg(result.Message);
                    console.info('/TOrder/add 失败');

                }
                else {
                    if(result.Message =="success")
                    {
                        console.info('/TOrder/add Succeess');
                        window.location.href = result.ReturnObject;
                    }else
                    {
                        console.info('/TOrder/add 没 Succeess 进入loop');
                        _loop();
                    }
                }
            },
            error: function (e) {
                layer.msg("下单异常,请刷新重试");
            }
        });
    }

    init();

    console.info('===>link block!');
});
