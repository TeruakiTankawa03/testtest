$(function() {
  // drawer.js
    $('.drawer').drawer();


  // スムーススクロール
  // ①〜③はどれも超重要 ④はなくても動く(fixedなので)
  // ↓#からはじまるURLがクリックされた時の処理
  $('a[href^="#"]').click(function() {

    // ①取得
    // ↓hrefの id の属性を取得 = #card, #newsなど 参考URL:https://www.sejuku.net/blog/37402
    let id = jQuery(this).attr("href");
    // ↓取得したidが#のみだった場合、targetをhtmlにしてtopに戻す
    let target = jQuery("#" == id ? "html" : id);

    // ↓ページのトップを基準にターゲットの位置を取得
    let position = jQuery(target).offset().top;

    // ②移動速度
    // ↓移動速度を指定
    let speed = 300;
    // ↓ターゲットの位置まで、speedの速度で移動
    jQuery("html, body").animate({
      // ③topから #js-header の高さを引く
        scrollTop: position - $( "#js-header" ).outerHeight()
      },
      speed
    );
    return false;

    // ④ヘッダーがfixedではない時の移動距離の計算の仕方
    // ↓もしヘッダーがfixedではない場合、ヘッダー分は引かないでスムーススクロールするという意味
    if ("fixed" !== jQuery(".header").css("position")) {
      position = jQuery(target).offset().top;
    }
    if (0 > position) {
      position = 0;
    }
  });

  // floating button
  // フローティングボタン スクロールで表示①
  // ↓100px以上スクロールすると表示・以下だと非表示
  $(window).on("scroll", function(){
    if ($(this).scrollTop() > 100) { /* 100以上スクロールされた時 */
        // ↓fast = 0.2秒   0.2秒で表示非表示
  $(".footer__floating").fadeIn("fast"); /* 表示 */
    } else {
      $(".footer__floating").fadeOut("fast"); /* 非表示 */
    }
  });

  // フローティングボタンを押して、上にスムースにスクロールさせる②
  $(".footer__floating").click(function(){
    $('body,html').animate({
      scrollTop: 0 /* 一番上まで移動 */
    }, 300, 'swing');
      return false;
  });


  // wow.js
  new WOW().init();


    // Google form
    // let $form = $( "#js-form" )
    // $form.submit(function (e) { 
    //   $.ajax({ 
    //     url: $form.attr('action'), 
    //     data: $form.serialize(), 
    //     type: "POST", 
    //     dataType: "xml", 
    //     statusCode: { 
    //       0: function () { 
    //       //送信に成功したときの処理
    //         $form.slideUp()
    //         $( '#js-success' ).slideDown()
    //       }, 
    //       200: function () { 
    //       //送信に失敗したときの処理
    //         $form.slideUp()
    //         $( '#js-error' ).slideDown()
    //       } 
    //     } 
    //   }); 
    //   return false; 
    // });
  
    // formの入力確認
    // id="js-submit" を定義
    let $submit = $( '#js-submit' )
    // id="js-form" の input と textarea が変更された時の動き
    // input = お名前, メールアドレス, プライバシーポリシーのチェックボックス (個人/法人の選択)
    // textarea = お問い合わせ内容
    // on = イベントが発生した時
    $( '#js-form input, #js-form textarea' ).on( 'change',function(){
      if (
        // ↓①「お名前」の値が空白ではない時 
        // ↓「.val()」 → 値の取得, 「!==」 → ではない, 「""」 → 空白, 「&&」 → かつ（なおかつ）
        $( '#js-form input[type="text"]' ).val() !== "" &&
        $( '#js-form input[type="tel"]' ).val() !== "" &&
        // ↓のように、nameを指定しても動く
        // $( '#js-form input[name="entry.322182761"]' ).val() !== "" &&
        // ②「メールアドレス」の値が空白ではない時
        $( '#js-form input[type="email"]' ).val() !== "" &&
        // $( '#js-form textarea' ).val() !== "" &&
        $( '#js-form textarea[name="text"]' ).val() !== "" &&
        // ③チェックボックスのnameがチェックされている時 （type="checkbox" を書いても動く）
        // prop = チェックボックスにチェックが入っているかどうかを確認する. checked = true だった時 = チェックされている時
        // $( '#js-form input[name="entry.1535691561"]' ).prop( 'checked' ) === true
        $( '#js-form input[type="checkbox"]' ).prop( 'checked' ) === true
      ) {
        // 全て入力された時
        $submit.addClass( '-active' )
        // if内で全て入力された時 = disabled を外す
        $submit.prop( 'disabled', false )
      } else {
        // 全て入力されていない時
        $submit.removeClass( '-active' )
        // else = それ以外 = 全て入力されていない時 = disabled をつける（デフォルト状態）
        $submit.prop( 'disabled', true )
      }
    })


    // モーダル
    $('.js-modal-open').on('click',function(){
        $('.js-modal').fadeIn();
        return false;
    });
    $('.js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();
        return false;
    });
});