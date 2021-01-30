window.addEventListener('load', function() {
    // 图片放大镜
    var bigImg_wrap = document.querySelector('.bigImg-wrap');
    var mask = document.querySelector('.mask');
    var sideBox = document.querySelector('.side');
    var initial_img = document.querySelector('.initial');
    var bigger_img = document.querySelector('.bigger');
    var littleImgs = document.querySelector('.littleImg-wrap').querySelectorAll('img');

    bigImg_wrap.addEventListener('mouseenter', function() {
        mask.style.display = 'block';
        sideBox.style.display = 'block';
    });

    bigImg_wrap.addEventListener('mouseleave', function() {
        mask.style.display = 'none';
        sideBox.style.display = 'none';
    });

    bigImg_wrap.addEventListener('mousemove', function(e) {
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        let maskX = x - mask.offsetWidth / 2;
        let maskY = y - mask.offsetHeight / 2;
        let maskX_Max = this.offsetWidth - mask.offsetWidth;
        let maskY_Max = this.offsetHeight - mask.offsetHeight;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskX_Max) {
            maskX = maskX_Max;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskY_Max) {
            maskY = maskY_Max;
        }
        // 注意区分X，Y
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        let imgX_Max = bigger_img.offsetWidth - sideBox.offsetWidth;
        let imgY_Max = bigger_img.offsetHeight - sideBox.offsetHeight;
        let imgX = imgX_Max * maskX / maskX_Max;
        let imgY = imgY_Max * maskY / maskY_Max;
        bigger_img.style.left = -imgX + 'px';
        bigger_img.style.top = -imgY + 'px';
    });

    // 图片切换
    var biggerImg_src = ['upload/s01.png', 'upload/s02.png', 'upload/s03.png', 'upload/s01.png', 'upload/s02.png'];
    for (let i = 0; i < littleImgs.length; i++) {
        // 默认先让第一张图片被选中
        littleImgs[0].parentNode.classList.add('hover');
        littleImgs[i].addEventListener('mouseover', function() {
            clearStyle();
            this.parentNode.classList.add('hover');
            initial_img.src = this.src;
            bigger_img.src = biggerImg_src[i];
            // 按钮点击与鼠标移入事件同步
            num = i;
        });
    }

    function clearStyle() {
        for (let i = 0; i < littleImgs.length; i++) {
            littleImgs[i].parentNode.classList.remove('hover');
        }
    }
    var prevBtn = document.querySelector('.btn-prev');
    var nextBtn = document.querySelector('.btn-next');
    var num = 0;
    prevBtn.addEventListener('click', function() {
        if (num == 0) {
            num = littleImgs.length;
        }
        num--;
        toggle_src();
    });

    function toggle_src() {
        clearStyle();
        littleImgs[num].parentNode.classList.add('hover');
        initial_img.src = littleImgs[num].src;
        bigger_img.src = biggerImg_src[num];
    }
    nextBtn.addEventListener('click', function() {
        num++;
        if (num == littleImgs.length) {
            num = 0;
        }
        toggle_src();
    });

    var color_as = document.querySelector('.color').querySelectorAll('a');
    var edition_as = document.querySelector('.edition').querySelectorAll('a');
    var ram_as = document.querySelector('.ram').querySelectorAll('a');
    var buyWay_as = document.querySelector('.buyWay').querySelectorAll('a');
    var suit_as = document.querySelector('.suit').querySelectorAll('a');
    clickToggle(color_as);
    clickToggle(edition_as);
    clickToggle(ram_as);
    clickToggle(buyWay_as);
    clickToggle(suit_as);

    function clickToggle(as) {
        for (let i = 0; i < as.length; i++) {
            as[i].onclick = function() {
                for (let i = 0; i < as.length; i++) {
                    as[i].classList.remove('active');
                }
                this.classList.add('active');
            }
        }
    }

    var detail_hds = document.querySelector('.detail-hd').querySelectorAll('li');
    var detail_bds = document.querySelectorAll('.detail-bd');
    for (let i = 0; i < detail_hds.length; i++) {
        detail_hds[i].setAttribute('index', i);
        detail_hds[i].addEventListener('click', function() {
            for (let i = 0; i < detail_hds.length; i++) {
                detail_hds[i].classList.remove('checked');
                detail_bds[i].style.display = 'none';
            }
            this.classList.add('checked');
            let index = this.getAttribute('index');
            detail_bds[index].style.display = 'block';
        });
    }
    var more = document.querySelector('.more');
    more.addEventListener('click', function() {
        detail_hds[1].click();
    });

    // 待做：评价的发布与删除、获取当前发布时间、点赞数
})