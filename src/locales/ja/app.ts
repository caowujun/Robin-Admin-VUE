export default {
  app: {
    appTitle: '天空有座城'
  },
  app_common: {
    action: '操作',
    delete: '削除',
    detail: '詳細',
    confirm: '確認',
    cancel: 'キャンセル',
    add: '新規作成',
    edit: '編集',
    save: '保存',
    noMessage: 'データがありません',
    deleteAll: 'すべて削除',
    notes: 'コメント',
    length_notes: '1〜512文字を入力してください',
    saveSuccess: '保存に成功しました',
    inputText: '入力してください',
    selectText: '選択してください',
    startTimeText: '開始時間',
    endTimeText: '終了時間',
    required: 'この項目は必須です',
    document: 'プロジェクトドキュメント',
    reminder: '暖かいヒント',
    back: 'リターンマッチ',
    ok: '確認',
    reload: '再ロード',
    prevLabel: '前へ',
    nextLabel: '後へ',
    skipLabel: 'スキップ',
    doneLabel: '終了',
    menu: 'メニュー',
    tool: 'ツール',
    query: 'クエリ',
    reset: 'リセット',
    shrink: 'やめる',
    expand: 'てんかい',
    delMessage: '選択したデータを削除しますか？',
    delWarning: 'ヒント',
    delOk: '確認',
    delCancel: 'キャンセル',
    delNoData: '削除するデータを選択してください',
    delSuccess: '削除に成功しました',
    recordDate: '発生日',
    yes: 'はい',
    no: 'いいえ',
    noMessageAlert: 'データが存在しません。',
    noMessageClose: '閉じる',
    warnning: '警告'
  },
  app_dashboard: {
    am: 'おはようございます',
    pm: 'こんにちは',
    today: '今日',
    yesterday: '昨日',
    now: '現在',
    happyDay: '毎日楽しんでね!',
    introduction: '学習関連記事'
  },
  app_login: {
    login: 'ログイン',
    loginSubTitle: 'ユーザーIDとパスワード登録',
    accountId: 'ユーザーID',
    accountName: 'ユーザー名',
    password: 'パスワード',
    remember: '次回から自動でログイン',
    currentPassword: '現在のパスワード',
    newPassword: '新しいパスワード',
    newPasswordAgain: '新しいパスワードの再入力',
    email: 'メールアドレス',
    loginInBtn: 'ログイン',
    resetPwdBtn: 'パスワードの更新',
    mailSendSuccess: 'メールを送信しました。',

    forgetPassword: 'パスワードをお忘れの場合はこちら',
    required_accountID: 'ユーザーIDを入力してください。',
    required_currentPassword: '現在のパスワードを入力してください。',
    required_password: 'パスワードを入力してください。',
    required_accountName: 'ユーザーIDを入力してください。',
    required_email: 'メールアドレスを入力してください。',

    length_accountId: '4～32文字で入力してください。',
    length_password: '8文字以上、64文字以下で入力してください。',
    length_accountName: '1～50文字で入力してください。',
    length_email: '正しいメールアドレスを入力してください。',

    formater_accountId: '半角英数字およびアンダースコアのみを入力できる。',
    formater_password: '半角英大文字・半角英小文字・半角数字を混在で入力してください。',
    passwordEqual: 'パスワードが一致していません。',
    formater_email: '正しいメールアドレスを入力してください。',

    logOut: 'ログアウト',
    logOutMessage: 'ログアウトしますか？',
    modifyPwdItem: 'パスワードを変更する',
    userInfoItem: 'ユーザー情報を変更する',
    // modifyPwdTitle: 'パスワード変更',
    // userInfoTitle: 'ユーザー情報変更',
    resetPwdSuccessTip: 'ログインページへ'
  },
  app_menu: {
    home: 'ダッシュボード',
    personTools: '個人管理',
    battle: '運動記録',
    schedule: 'スケジュール管理',
    income: '収支記録',
    gasoline: '燃費記録',
    sysSetting: 'システム設定',
    userManage: 'ユーザー管理',
    roleManage: '権限管理',
    enumType: '列挙管理',
    logManage: '操作ログ',
    sysLog: 'システムログ',
    operateLog: '操作ログ',
    article: '記事の共有'
  },

  app_money: {
    amount: '金額',
    category: 'カテゴリ',
    income: '収入',
    expenditure: '支出'
  },
  app_battle: {
    // triggerTime: 'トリガ時間',
    battleNumber: '回数'
  },
  app_gasoline: {
    amount: '金額',
    litre: '容積（リットル）',
    unitPrice: '単価',
    isFillUp: '満タンかどうか',
    kilometers: 'キロすう'
  },
  app_schedule: {
    scheduleDate: 'スケジュール'
    // scheduleStartDate: 'スケジュール開始時間',
    // scheduleEndDate: 'スケジュール終了時間'
  },
  app_user: {
    username: 'ログイン名',
    password: 'パスワード',
    userDisplayName: 'ユーザー名',
    roleType: '権限',
    email: 'メールアドレス',
    address: '住所',
    phone: '携帯番号',
    adminUser: '管理者',
    normalUser: '一般ユーザー',
    cityCode: '都市コーディング'
  },
  app_enum: {
    enumType: 'カテゴリ',
    enumName: '列挙名',
    enumValue: '列挙値',
    enumLanguage: '多言語パス'
  },
  app_log: {
    actionType: '操作タイプ',
    exceptionType: '例外タイプ',
    exceptionMsg: '例外情報',
    actionText: 'オペレーション情報'
  },
  app_article: {
    java: 'Java',
    react: 'React',
    vue: 'Vue',
    unclassified: '未分類',
    articleName: '記事の名前',
    articleType: '記事の種類',
    articleUrl: '記事のパス'
  }
}
