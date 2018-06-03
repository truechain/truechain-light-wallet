var procinstid = 0;
  //初始化页面执行操作  
  function plusReady() {
    //Android返回键监听事件  
    plus.key.addEventListener('backbutton', function() {
      myclose();
    }, false);
  }
  if(window.plus) {
    plusReady();
  } else {
    document.addEventListener('plusready', plusReady, false);
  }
  //加载页面初始化需要加载的图片信息  
  //或者相册IMG_20160704_112620.jpg  
  //imgId:图片名称：1467602809090或者IMG_20160704_112620  
  //imgkey:字段例如：F_ZDDZZ  
  //ID：站点编号ID,例如429  
  //src：src="file:///storage/emulated/0/Android/data/io.dcloud.HBuilder/.HBuilder/apps/HBuilder/doc/upload/F_ZDDZZ-1467602809090.jpg"  
  function showImgDetail(imgId, imgkey, id, src) {
    var html = "";
    html += '<div  id="Img' + imgId + imgkey + '" class="image-item ">';
    html += '    <img id="picBig" data-preview-src="" data-preview-group="1" ' + src + '/>';
    html += '    <span class="del" onclick="delImg(\'' + imgId + '\',\'' + imgkey + '\',' + id + ');">';
    html += '        <div class="fa fa-times-circle"></div>';
    html += '    </span>';
    html += '</div>';
    $("#" + imgkey + "S").append(html);
  }
  //删除图片  
  //imgId:图片名称：IMG_20160704_112614  
  //imgkey:字段，例如F_ZDDZZ  
  //ID：站点编号ID，例如429  
  function delImg(imgId, imgkey, id) {
    var bts = ["是", "否"];
    plus.nativeUI.confirm("是否删除图片？", function(e) {
      var i = e.index;
      if(i == 0) {
        var itemname = id + "img-" + imgkey; //429img-F_ZDDZZ  
        var itemvalue = plus.storage.getItem(itemname);
        //{IMG_20160704_112614,_doc/upload/F_ZDDZZ-IMG_20160704_112614.jpg,file:///storage/emulated/0/Android/data/io.dcloud...../doc/upload/F_ZDDZZ-1467602809090.jpg}  
        if(itemvalue != null) {
          var index = itemvalue.indexOf(imgId + ",");
          if(index == -1) { //没有找到  
            delImgfromint(imgId, imgkey, id, index);
          } else {
            delImgFromLocal(itemname, itemvalue, imgId, imgkey, index); //修改，加了一个index参数  
          }

        } else {
          delImgfromint(imgId, imgkey, id);
        }
      }
    }, "查勘", bts);
    /*var isdel = confirm("是否删除图片？");  
    if(isdel == false){  
        return;  
    }*/

  }

  function delImgFromLocal(itemname, itemvalue, imgId, imgkey, index) {
    var wa = plus.nativeUI.showWaiting();
    var left = itemvalue.substr(0, index - 1);
    var right = itemvalue.substring(index, itemvalue.length);
    var end = right.indexOf("}");
    right = right.substring(end + 1, right.length);
    var newitem = left + right;
    plus.storage.setItem(itemname, newitem);
    //myAlert("删除成功");  
    $("#Img" + imgId + imgkey).remove();
    wa.close();
  }
  //选取图片的来源，拍照和相册  
  function showActionSheet(conf) {
    var divid = conf.id;
    var actionbuttons = [{
      title: "拍照"
    }, {
      title: "相册选取"
    }];
    var actionstyle = {
      title: "选择照片",
      cancel: "取消",
      buttons: actionbuttons
    };
    plus.nativeUI.actionSheet(actionstyle, function(e) {
      if(e.index == 1) {
        getImage(divid);
      } else if(e.index == 2) {
        galleryImg(divid);
      }
    });
  }

  function galleryImg(divid) {
    plus.gallery.pick(function(e) {
      //alert(e.files.length);
      var zm = 0;
      setTimeout(file, 200);

      function file() {
        plus.io.resolveLocalFileSystemURL(e.files[zm], function(entry) {
          compressImage(entry.toLocalURL(), entry.name, divid);
        }, function(e) {
          plus.nativeUI.toast("读取拍照文件错误：" + e.message);
        });
        zm++;
        if(zm < e.files.length) {
          setTimeout(file, 200);
        }
      }

    }, function(e) {
      console.log("取消选择图片");
    }, {
      filename: "_doc/camera/",
      filter: "image",
      multiple: true
    });
  }
  // 拍照  
  function getImage(divid) {
    var cmr = plus.camera.getCamera();
    cmr.captureImage(function(p) {
      //alert(p);//_doc/camera/1467602809090.jpg  
      plus.io.resolveLocalFileSystemURL(p, function(entry) {
        //alert(entry.toLocalURL());//file:///storage/emulated/0/Android/data/io.dcloud...../doc/camera/1467602809090.jpg  
        //alert(entry.name);//1467602809090.jpg  
        compressImage(entry.toLocalURL(), entry.name, divid);
      }, function(e) {
        plus.nativeUI.toast("读取拍照文件错误：" + e.message);
      });
    }, function(e) {}, {
      filename: "_doc/camera/",
      index: 1
    });
  }
  //压缩图片  
  function compressImage(url, filename, divid) {
    var name = "_doc/upload/" + divid + "-" + filename; //_doc/upload/F_ZDDZZ-1467602809090.jpg  
    plus.zip.compressImage({
        src: url, //src: (String 类型 )压缩转换原始图片的路径  
        dst: name, //压缩转换目标图片的路径  
        quality: 20, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100  
        overwrite: true //overwrite: (Boolean 类型 )覆盖生成新文件  
      },
      function(event) {
        //uploadf(event.target,divid);  
        var path = name; //压缩转换目标图片的路径  
        //event.target获取压缩转换后的图片url路  
        //filename图片名称  
        saveimage(event.target, divid, filename, path);
      },
      function(error) {
        plus.nativeUI.toast("压缩图片失败，请稍候再试");
      });
  }
  //保存信息到本地  
  /**  
   *   
   * @param {Object} url  图片的地址  
   * @param {Object} divid  字段的名称  
   * @param {Object} name   图片的名称  
   */
  function saveimage(url, divid, name, path) {
    //alert(url);//file:///storage/emulated/0/Android/data/io.dcloud...../doc/upload/F_ZDDZZ-1467602809090.jpg  
    //alert(path);//_doc/upload/F_ZDDZZ-1467602809090.jpg  
    var state = 0;
    var wt = plus.nativeUI.showWaiting();
    //  plus.storage.clear();   
    name = name.substring(0, name.indexOf(".")); //图片名称：1467602809090  
    var id = document.getElementById("ckjl.id").value;
    var itemname = id + "img-" + divid; //429img-F_ZDDZ  
    var itemvalue = plus.storage.getItem(itemname);
    if(itemvalue == null) {
      itemvalue = "{" + name + "," + path + "," + url + "}"; //{IMG_20160704_112614,_doc/upload/F_ZDDZZ-IMG_20160704_112614.jpg,file:///storage/emulated/0/Android/data/io.dcloud...../doc/upload/F_ZDDZZ-1467602809090.jpg}  
    } else {
      itemvalue = itemvalue + "{" + name + "," + path + "," + url + "}";
    }
    plus.storage.setItem(itemname, itemvalue);

    var src = 'src="' + url + '"';
    //alert("itemvalue="+itemvalue);  
    showImgDetail(name, divid, id, src);
    wt.close();

  }
  //上传图片，实例中没有添加上传按钮  
  function uploadimge(agree, back) {
    //plus.storage.clear();  
    var wa = plus.nativeUI.showWaiting();
    var DkeyNames = [];
    var id = document.getElementById("ckjl.id").value;
    var length = id.toString().length;
    var idnmae = id.toString();
    var numKeys = plus.storage.getLength();
    var task = plus.uploader.createUpload(getUrl() + 'url', {
        method: "POST"
      },
      function(t, status) {
        if(status == 200) {
          console.log("上传成功");
          $.ajax({
            type: "post",
            url: getUrl() + 'url',
            data: {
              taskId: taskId,
              voteAgree: agree,
              back: back,
              voteContent: $("#assign").val(),
            },
            async: true,
            dataType: "text",
            success: function(data) {
              wa.close();
              goList(data);

            },
            error: function() {
              wa.close();
              myAlert("网络错误，提交审批失败，请稍候再试");
            }
          });

        } else {
          wa.close();
          console.log("上传失败");
        }
      }
    );
    task.addData("id", id);
    for(var i = 0; i < imgArray.length; i++) {
      var itemkey = id + "img-" + imgArray[i];
      if(plus.storage.getItem(itemkey) != null) {
        var itemvalue = plus.storage.getItem(itemkey).split("{");
        for(var img = 1; img < itemvalue.length; img++) {
          var imgname = itemvalue[img].substr(0, itemvalue[img].indexOf(","));
          var imgurl = itemvalue[img].substring(itemvalue[img].indexOf(",") + 1, itemvalue[img].lastIndexOf(","));
          task.addFile(imgurl, {
            key: imgurl
          });
        }
      }
    }
    task.start();

  }