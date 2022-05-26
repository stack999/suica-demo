// Flickr API key
const API_KEY = 'c72c47ff16cb61c4838ac01a0d05671e';

/**
 * --------------------
 * Flickr API 関連の関数
 * --------------------
 */
 


/**
 * ----------------------------------
 * Tooltipを表示するカスタムディレクティブ
 * ----------------------------------
 */

Vue.directive('tooltip', {
  bind(el, binding) {
    $(el).tooltip({
      title: binding.value,
      placement: 'bottom',
    });
  },
  unbind(el) {
    $(el).tooltip('dispose');
  },
});


/**
 * ※参考：コードのひな形
 * ここまで学習した内容を基に、Vueのコードを書くときの「ひな形」を用意しました。課題に取り組む際の参考にしてください。
 */

new Vue({
  el: '#gallery', // elオプションの値に '#gallery' を設定

  data: {
    // 利用するデータを設定
    photos: [],
    photos_dogs: [],
  },

  created() {
    // Vueが読み込まれたときに実行する処理を定義
    const url_cat = this.getRequestURL('cat');

    $.getJSON(url_cat, (data) => {
      if (data.stat !== 'ok') {
        return;
      }

      this.total = data.photos.total;
      this.photos = data.photos.photo.map(photo => ({
        id: photo.id,
        imageURL: this.getFlickrImageURL(photo, 'q'),
        pageURL: this.getFlickrPageURL(photo),
        text: this.getFlickrText(photo),
      }));
    });

    const url_dog = this.getRequestURL('dog');

     $.getJSON(url_dog, (data) => {
      if (data.stat !== 'ok') {
        return;
      }

      this.total = data.photos.total;
      this.photos_dogs = data.photos.photo.map(photo => ({
        id: photo.id,
        imageURL: this.getFlickrImageURL(photo, 'q'),
        pageURL: this.getFlickrPageURL(photo),
        text: this.getFlickrText(photo),
      }));
     });
  },

  methods: {
    // 呼び出して利用できる関数を定義( aaa や bbb の関数名を書き換えること。関数の追加も可能 )
    // 検索テキストに応じたデータを取得するためのURLを作成して返す
    getRequestURL(searchText){
      const parameters = $.param({
        method: 'flickr.photos.search',
        api_key: API_KEY,
        text: searchText, // 検索テキスト
        sort: 'interestingness-desc', // 興味深さ順
        per_page: 4, // 取得件数
        license: '4', // Creative Commons Attributionのみ
        extras: 'owner_name,license', // 追加で取得する情報
        format: 'json', // レスポンスをJSON形式に
        nojsoncallback: 1, // レスポンスの先頭に関数呼び出しを含めない
      });
      const url = `https://api.flickr.com/services/rest/?${parameters}`;
      return url;
    },
    // photoオブジェクトから画像のURLを作成して返す
    getFlickrImageURL(photo, size){
      let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
      if (size) {
      // サイズ指定ありの場合
        url += `_${size}`;
      }
      url += '.jpg';
      return url;
    },
  
    // photoオブジェクトからページのURLを作成して返す
    getFlickrPageURL(photo){
      return `https://www.flickr.com/photos/${photo.owner}/${photo.id}`
    },
    // photoオブジェクトからaltテキストを生成して返す
    getFlickrText(photo){
      let text = `"${photo.title}" by ${photo.ownername}`;
      if (photo.license === '4') {
        // Creative Commons Attribution（CC BY）ライセンス
      text += ' / CC BY';
      }
      return text;
    },
  },
});
