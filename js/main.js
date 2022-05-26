/* global $ MobileDetect */

// モバイルブラウザかどうか判定
const isMobile = !!new MobileDetect(window.navigator.userAgent).mobile();

/**
 * ----------------------
 * 指定された名前のタブを表示
 * ----------------------
 */
const showTab = (tabName) => {
  // すでに表示されている場合は何もせずに終了
  if ($(`#${tabName}`).is(':visible')) {
    return;
  }

  const tabsContainer = $(`a[href='#${tabName}']`).closest('.tabs');
  // .tabs__menu liのうちtabNameに該当するものにだけactiveクラスを付ける
  tabsContainer.find('.tabs__menu li').removeClass('active');
  tabsContainer
    .find(`.tabs__menu a[href='#${tabName}']`)
    .parent('li')
    .addClass('active');

  // .tabs__contentの直下の要素をすべて非表示
  tabsContainer.find('.tabs__content > *').css({ display: 'none' });
  // #<tabName>と.tabs__content .<tabName>を表示
  tabsContainer
    .find(`#${tabName}, .tabs__content .${tabName}`)
    .css({
      display: 'block',
      opacity: 0.7,
    })
    .animate(
      {
        opacity: 1,
      },
      400,
    );
};

/**
 * -------------
 * パララックス関連
 * -------------
 */

// 背景画像のスクロール速度。数字が小さいほど速い。
const parallaxXSpeed = 12;
const parallaxYSpeed = 3;
const parallaxXSpeedSmall = 5;
const parallaxYSpeedSmall = 1;

// パララックスを適用する関数
const showParallax = () => {
  const scrollTop = $(window).scrollTop();

  // 背景画像の位置をスクロールに合わせて変える
  const offsetX = Math.round(scrollTop / parallaxXSpeed);
  const offsetY = Math.round(scrollTop / parallaxYSpeed);
  const offsetXSmall = Math.round(scrollTop / parallaxXSpeedSmall);
  const offsetYSmall = Math.round(scrollTop / parallaxYSpeedSmall);

  $('.puppies').css({
    'background-position':
      // 一番上
      `${-offsetX}px ${-offsetY}px, ${
        // 上から2番目
        offsetXSmall
      }px ${-offsetYSmall}px, `
      // 一番下
      + '0% 0%',
  });

  $('.kittens').css({
    'background-position':
      // 一番上
      `${offsetX}px ${-offsetY}px, ${
        // 上から2番目
        -offsetXSmall
      }px ${-offsetYSmall}px, `
      // 一番下
      + '0% 0%',
  });
};

// パララックスを初期化する関数
const initParallax = () => {
  $(window).off('scroll', showParallax);

  if (!isMobile) {
    // モバイルブラウザでなければパララックスを適用
    showParallax();

    // スクロールのたびにshowParallax関数を呼ぶ
    $(window).on('scroll', showParallax);
  }
};

/**
 * ------------------
 * イベントハンドラの登録
 * ------------------
 */

/**
 * animatedクラスを持つ要素が画面内に入ったら
 * Animate.cssのfadeInUpエフェクトを適用
 */
$('.animated').waypoint({
  handler(direction) {
    if (direction === 'down') {
      $(this.element).addClass('fadeInUp');
      this.destroy();
    }
  },
  /**
   * 要素の上端が画面のどの位置に来たときにhandlerメソッドを呼び出すか指定
   * 0%なら画面の一番上、100%なら画面の一番下に来たときに呼び出される
   */
  offset: '100%',
});

$(window).on('resize', () => {
  // ウインドウがリサイズされるとここが実行される
  initParallax();
});

// タブがクリックされたらコンテンツを表示
$('.tabs__menu a').on('click', (e) => {
  const tabName = $(e.currentTarget).attr('href');

  // hrefにページ遷移しない
  e.preventDefault();

  if (tabName[0] === '#') {
    // hrefの先頭の#を除いたものをshowTab()関数に渡す
    showTab(tabName.substring(1));
  }
});

/**
 * ナビゲーションバーのリンクをクリックしたら、
 * スムーズにスクロールしながら対象位置に移動
 */
$('.nav-link').on('click', (e) => {
  const destination = $(e.target).attr('href');

  // 本来のクリックイベントは処理しない
  e.preventDefault();

  $('html, body').animate(
    {
      scrollTop: $(destination).offset().top,
    },
    1000,
  );

  // ハンバーガーメニューが開いている場合は閉じる
  $('.navbar-toggler:visible').trigger('click');
});

// d-inline-blockクラスの付いた要素にMagnific Popupを適用
// $('.d-inline-block').magnificPopup({
//   type: 'image',
//   gallery: { enabled: true },

//   /**
//    * ポップアップに適用されるクラス
//    * ここではフェードイン・アウト用のmfp-fadeクラスを適用
//    */
//   mainClass: 'mfp-fade',

//   // ポップアップが非表示になるまでの待ち時間
//   removalDelay: 300,
// });

// 「開く」をタップでモーダル開く
$('.JS_Click_ShowModal_Trigger').on('click', function(){
  $('.ModalLayer').addClass('isShow');
});
// オーバーレイをタップでモーダル閉じる
$('.ModalLayer-Mask').on('click', function(){
  $('.ModalLayer').removeClass('isShow');
});

function slideSwitch() {
  var $active = $('#slideshow img.active');
  
  if ( $active.length == 0 ) 
    $active = $('#slideshow img:last');
  
  var $next =  $active.next().length ? $active.next() : $('#slideshow img:first');
  $active.addClass('last-active');
    
  $next.css({opacity: 0.0})
    .addClass('active')
    .animate({opacity: 1.0}, 1000, function() {
     $active.removeClass('active last-active');
  });
}

$(function() {
  setInterval( "slideSwitch()", 5000 );
});

// 農情人個人ページ呼び出し
$(function(){
    $('.js-modal-open-nouzyouzin').on('click',function(){
        $('.js-modal-nouzyouzin').fadeIn();
        return false;
    });
    $('.js-modal-close-nouzyouzin').on('click',function(){
        $('.js-modal-nouzyouzin').fadeOut();
        return false;
    });
});

// kondo個人ページ呼び出し
$(function(){
    $('.js-modal-open-kondo').on('click',function(){
        $('.js-modal-kondo').fadeIn();
        return false;
    });
    $('.js-modal-close-kondo').on('click',function(){
        $('.js-modal-kondo').fadeOut();
        return false;
    });
});

// Tommyさん個人ページ呼び出し
$(function(){
    $('.js-modal-open-tommy').on('click',function(){
        $('.js-modal-tommy').fadeIn();
        return false;
    });
    $('.js-modal-close-tommy').on('click',function(){
        $('.js-modal-tommy').fadeOut();
        return false;
    });
});


// shimada個人ページ呼び出し
$(function(){
    $('.js-modal-open-shimada').on('click',function(){
        $('.js-modal-shimada').fadeIn();
        return false;
    });
    $('.js-modal-close-shimada').on('click',function(){
        $('.js-modal-shimada').fadeOut();
        return false;
    });
});

// akiyama個人ページ呼び出し
$(function(){
    $('.js-modal-open-akiyama').on('click',function(){
        $('.js-modal-akiyama').fadeIn();
        return false;
    });
    $('.js-modal-close-akiyama').on('click',function(){
        $('.js-modal-akiyama').fadeOut();
        return false;
    });
});

// mori個人ページ呼び出し
$(function(){
    $('.js-modal-open-mori').on('click',function(){
        $('.js-modal-mori').fadeIn();
        return false;
    });
    $('.js-modal-close-mori').on('click',function(){
        $('.js-modal-mori').fadeOut();
        return false;
    });
});

$(function(){
    $('.js-modal-open').on('click',function(){
        var id = $('.image-gallery__item').attr('id');
        console.log(id);
        $('.js-modal').fadeIn();
        return false;
    });
    $('.js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();
        return false;
    });
});


/**
$(function(){
  $('header, main, footer').inertiaScroll({
    parent: $("#wrap")

    //オプションを追加する場合はここに追記

  });
});
**/

/**
 * -----------------------------------------
 * ページの読み込みが完了したタイミングで行うDOM操作
 * -----------------------------------------
 */

// モバイルブラウザでは静止画を表示し、それ以外では動画を表示
if (isMobile) {
  $('.top__bg').css({
    'background-image': 'url(video/top-video-still.jpg)',
  });
} else {
  $('.top__video').css({ display: 'block' });
}

// 初期状態として1番目のタブを表示
showTab('puppies-1');
showTab('kittens-1');

// パララックスを初期化する
initParallax();

/**
 * -----------------------------------------
 * ボタン表示を変更する
 * -----------------------------------------
 */
const button1 = document.getElementById("button1");

button1.addEventListener('mouseout', () => {
  button1.style.backgroundColor = "#dcdcdc";
});

button1.addEventListener('mouseover', () => {
  button1.style.backgroundColor = "#c0c0c0";
});

const button2 = document.getElementById("button2");

button2.addEventListener('mouseout', () => {
  button2.style.backgroundColor = "#dcdcdc";
});

button2.addEventListener('mouseover', () => {
  button2.style.backgroundColor = "#c0c0c0";
});

const button3 = document.getElementById("button3");

button3.addEventListener('mouseout', () => {
  button3.style.backgroundColor = "#dcdcdc";
});

button3.addEventListener('mouseover', () => {
  button3.style.backgroundColor = "#c0c0c0";
});

const button4 = document.getElementById("button4");

button4.addEventListener('mouseout', () => {
  button4.style.backgroundColor = "#dcdcdc";
});

button4.addEventListener('mouseover', () => {
  button4.style.backgroundColor = "#c0c0c0";
});


