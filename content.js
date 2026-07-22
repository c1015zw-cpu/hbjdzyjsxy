window.SITE_DATA = {
  site: {
    id: "hbjd-freshman-guide",
    version: "2.0.2",
    contentVersion: "2.0.2",
    language: "zh-CN",
    title: "河北机电职业技术学院迎新导航",
    description: "面向河北机电职业技术学院 2026 级新生的非官方行动指南，整理官方入口、报到流程、阶段任务、行李清单与安全提醒。",
    themeColor: "#9a4e3f",
    defaultTheme: "warm",
    colors: {
      ink: "#302822",
      brand: "#9a4e3f",
      accent: "#e97755",
      paper: "#fbf4e9",
      white: "#fffdf8",
      muted: "#7b6d64",
      soft: "#f1e3d2"
    }
  },

  themes: [
    { id: "warm", label: "暖杏", colors: { ink: "#302822", brand: "#9a4e3f", accent: "#e97755", paper: "#fbf4e9", white: "#fffdf8", muted: "#7b6d64", soft: "#f1e3d2" } },
    { id: "coral", label: "珊瑚", colors: { ink: "#352328", brand: "#a23b4a", accent: "#f06b74", paper: "#fff1f1", white: "#fffafa", muted: "#7d6469", soft: "#f6dadd" } },
    { id: "amber", label: "向阳", colors: { ink: "#312a1c", brand: "#78571c", accent: "#e7aa2d", paper: "#fff8e7", white: "#fffdf7", muted: "#746b56", soft: "#f7e8b8" } },
    { id: "green", label: "青芽", colors: { ink: "#1f3026", brand: "#2c6546", accent: "#67b96e", paper: "#f0f8ef", white: "#fbfffb", muted: "#64766a", soft: "#ddecdd" } },
    { id: "blue", label: "晴空", colors: { ink: "#1d2b33", brand: "#245d7a", accent: "#4db4d7", paper: "#eff8fc", white: "#fbfeff", muted: "#607580", soft: "#d9edf5" } },
    { id: "indigo", label: "靛蓝", colors: { ink: "#25293a", brand: "#404c8a", accent: "#778ae8", paper: "#f2f3fb", white: "#fdfdff", muted: "#6d7082", soft: "#e0e3f4" } },
    { id: "violet", label: "柔紫", colors: { ink: "#302738", brand: "#6d4785", accent: "#b277c8", paper: "#f8f1fa", white: "#fffaff", muted: "#786a7d", soft: "#eddcf2" } }
  ],

  brand: {
    mark: "机",
    logo: "assets/avatar-240.jpg",
    name: "河北机电迎新导航",
    subtitle: "Freshman Guide · 2026",
    footerLine: "把复杂信息变成清晰行动。"
  },

  hero: {
    edition: "2026 新生第一周行动指南",
    prefix: "河北机电新生上岸",
    title: "照着这份地图慢慢来",
    intro: "从收到通知书到走进教室，把报到、入住和开课前要做的事一次整理清楚。",
    primaryAction: "先看报到流程",
    arrivalDate: "以学校 2026 年正式通知为准",
    campusAddress: "河北省邢台市信都区泉北西大街 1169 号",
    statusLabel: "你的准备清单",
    updatedAt: "更新于 07.21",
    cardMessage: "勾选完成项后，进度只保存在当前浏览器，不上传个人信息。"
  },

  notice: {
    enabled: true,
    title: "先认准官方通知",
    text: "报到、缴费、宿舍、军训与接站安排以学校当年正式通知为准；不要向私人账户转账，也不要透露短信验证码。"
  },

  quickLinks: [
    { icon: "路", title: "报到路线", description: "到校当天按顺序行动", url: "#roadmap" },
    { icon: "任", title: "阶段任务", description: "到哪个阶段看哪一组", url: "#tasks" },
    { icon: "官", title: "官方入口", description: "官网、招生网与迎新系统", url: "#services" },
    { icon: "微", title: "联系浪花", description: "报到、宿舍与入学准备", url: "#contact" }
  ],

  highlights: [
    { value: "4", label: "个官方入口" },
    { value: "4", label: "步报到流程" },
    { value: "5", label: "组阶段任务" },
    { value: "8", label: "项准备清单" }
  ],

  roadmapIntro: "现场安排可能变化，先找学院迎新点，再按学校当年流程行动。",
  roadmap: [
    { time: "到校", title: "先找到学院迎新点", detail: "核对身份、专业和班级信息，确认现场流程后再搬运行李。" },
    { time: "随后", title: "办理报到与入住", detail: "按指引完成必要手续，确认宿舍楼、房间、床位和宿管联系方式。" },
    { time: "当天", title: "只办必要事项", detail: "校园卡、体检和军训物资按通知办理，推销项目先不急着决定。" },
    { time: "晚上", title: "整理第二天安排", detail: "收藏班级通知、上课地点和官方入口，把宿舍信息同步给家人。" }
  ],

  taskGroups: [
    {
      id: "before",
      label: "出发前",
      eyebrow: "BEFORE ARRIVAL",
      title: "先处理无法临时补办的事项",
      intro: "不用急着买齐所有东西，先保证身份、信息和行程不出问题。",
      items: [
        { title: "核对正式通知", detail: "确认报到日期、校区、学院、宿舍和接站安排，保存通知截图。" },
        { title: "单独收好证件", detail: "身份证、录取通知书、证件照及学校要求材料放进随身包。" },
        { title: "规划到校路线", detail: "收藏学校地址并准备一套备选交通方案，将预计到校时间告诉家人。" }
      ],
      tip: "不确定是否必须携带的材料，先询问学校招生部门或学院辅导员。"
    },
    {
      id: "arrival",
      label: "报到日",
      eyebrow: "ARRIVAL DAY",
      title: "跟着学院指引走，不急着办额外项目",
      intro: "现场信息很多，先完成必要手续，再处理可以延后的事项。",
      items: [
        { title: "确认迎新人员身份", detail: "优先寻找学校统一标识、学院迎新点或官方志愿者。" },
        { title: "核对领取材料", detail: "当场检查校园卡、宿舍钥匙、流程单等是否齐全。" },
        { title: "拒绝非官方收费", detail: "遇到推销、兼职或代缴费，先离开现场再向学校核实。" }
      ],
      tip: "不要把身份证原件、手机、银行卡或验证码交给身份不明的人代办。"
    },
    {
      id: "dorm",
      label: "宿舍",
      eyebrow: "DORM LIFE",
      title: "先保证能睡、能洗、能充电",
      intro: "宿舍空间有限，确认尺寸和管理规定前，不建议先买大件物品。",
      items: [
        { title: "检查床位与设施", detail: "记录损坏处并及时报修，确认床铺尺寸和用电规定。" },
        { title: "保管钥匙与贵重物品", detail: "离开宿舍随手锁门，证件和电子设备不要放在公共区域。" },
        { title: "约定共同生活规则", detail: "尽早沟通作息、卫生、空调和访客等容易产生分歧的事项。" }
      ],
      tip: "插排、电吹风和其他电器先看宿舍管理规定，违规电器不要带也不要买。"
    },
    {
      id: "study",
      label: "开课前",
      eyebrow: "READY FOR CLASS",
      title: "把课表、教室和账号一次确认清楚",
      intro: "第一周群消息很多，关键安排要单独收藏，不要只靠聊天记录。",
      items: [
        { title: "登录学校系统", detail: "检查课程、上课时间和教室，按学校要求修改初始密码。" },
        { title: "确认班级通知渠道", detail: "只保留经过辅导员或班助确认的正式群聊。" },
        { title: "提前走一遍路线", detail: "从宿舍到教学楼实地走一次，给早高峰预留时间。" }
      ],
      tip: "教材版本、调课和集合安排以老师、辅导员及学校系统通知为准。"
    },
    {
      id: "safety",
      label: "避坑",
      eyebrow: "SAFETY CHECK",
      title: "钱、证件、账号和隐私，多核实一步",
      intro: "开学季信息复杂，任何催促转账和索要验证码的消息都先停下。",
      items: [
        { title: "收费只走官方渠道", detail: "不向私人账户转账，不相信所谓内部名额、代缴费和刷流水。" },
        { title: "证件账号不外借", detail: "身份证、银行卡、校园卡、密码和验证码不要交给陌生人。" },
        { title: "兼职推销不交押金", detail: "先看地点、合同和结算方式，不交培训费、保证金或证件原件。" }
      ],
      tip: "拿不准就先截图，联系辅导员、宿管或学校相关部门核实。"
    }
  ],

  weekPlan: [
    { day: "DAY 01", title: "报到与入住", detail: "完成身份核验、领钥匙、整理床位，晚上只做必要的信息归档。", tag: "先安顿" },
    { day: "DAY 02", title: "熟悉生活半径", detail: "找到食堂、快递点、医务服务、打印店和常用便利店。", tag: "先认路" },
    { day: "DAY 03", title: "确认班级信息", detail: "核对班群、辅导员、班助、军训或入学教育安排。", tag: "核信息" },
    { day: "BEFORE CLASS", title: "为开课做准备", detail: "登录学校系统，收藏课表，提前走一遍宿舍到教学楼的路线。", tag: "不迟到" }
  ],

  serviceFilters: [
    { id: "all", label: "全部" },
    { id: "official", label: "学校信息" },
    { id: "arrival", label: "报到录取" },
    { id: "study", label: "校园服务" },
    { id: "support", label: "咨询帮助" }
  ],

  serviceDirectory: [
    { category: "official", icon: "校", title: "学校官网", detail: "新闻、通知和学校公开服务入口。", meta: "河北机电职业技术学院", action: "进入官网", url: "https://www.hbjd.edu.cn/" },
    { category: "arrival", icon: "招", title: "招生信息网", detail: "招生章程、录取通知和公开招生信息。", meta: "招生 / 录取 / 通知", action: "查看招生信息", url: "https://zs.hbjd.edu.cn/" },
    { category: "arrival", icon: "迎", title: "迎新系统", detail: "按学校开放时间和账号规则进入办理。", meta: "报到 / 入学 / 办理", action: "进入迎新系统", url: "https://yx.hbjd.edu.cn/" },
    { category: "study", icon: "智", title: "智慧校园", detail: "账号开通后，按学校通知登录校园服务。", meta: "账号 / 服务 / 门户", action: "进入智慧校园", url: "https://portal.hbjd.edu.cn/" },
    { category: "support", icon: "电", title: "招生咨询电话", detail: "学校官网公开电话：0319-8769861。", meta: "工作时间内咨询", action: "拨打电话", url: "tel:03198769861" },
    { category: "support", icon: "址", title: "学校地址", detail: "河北省邢台市信都区泉北西大街 1169 号。", meta: "出发前再次核对路线", action: "查看报到流程", url: "#roadmap" }
  ],

  checklist: [
    { id: "id-card", group: "证件", text: "身份证与录取通知书" },
    { id: "photos", group: "证件", text: "学校要求规格的证件照及相关材料" },
    { id: "official", group: "信息", text: "收藏学校官网、招生网、迎新系统和学院通知" },
    { id: "contacts", group: "信息", text: "保存辅导员、宿管或学校公开咨询电话" },
    { id: "charger", group: "随身", text: "手机、充电器、充电宝与数据线" },
    { id: "medicine", group: "随身", text: "个人常用药、雨具、水杯和洗漱用品" },
    { id: "route", group: "行程", text: "到校路线与一套备选交通方案" },
    { id: "family", group: "行程", text: "把到校时间、学校地址和宿舍信息告知家人" }
  ],

  safetyCards: [
    { icon: "验", title: "缴费先验真", detail: "只使用录取通知书、学校官网或官方渠道公布的入口，不向私人账户转账。" },
    { icon: "锁", title: "验证码不给人", detail: "密码、短信验证码、身份证照片和银行卡信息不要交给陌生人代办。" },
    { icon: "停", title: "推销先暂停", detail: "电话卡、培训、兼职和宿舍用品不必现场决定，离开后核实清楚再购买。" }
  ],

  faqs: [
    { question: "2026 级报到日期和宿舍安排在哪里看？", answer: "优先查看录取通知书、学校迎新系统和学院正式通知。页面不补造尚未公开的年度安排。" },
    { question: "需要提前买齐整套宿舍用品吗？", answer: "建议先确认床铺尺寸、宿舍配置和管理规定。证件、个人药品等必须品随身带，大件用品可到校观察后再决定。" },
    { question: "有人拉群、收费或推荐兼职怎么办？", answer: "先核实群主和收费主体是否为学校官方人员。任何要求向私人账户转账、索取验证码或抵押证件的情况都应立即停止。" },
    { question: "页面信息和学校通知不一致怎么办？", answer: "无条件以学校当年正式通知为准。页面只负责整理行动方法和官方入口。" },
    { question: "勾选的清单会上传个人信息吗？", answer: "不会。清单只保存在当前浏览器的本地存储中，换设备或清理浏览器数据后需要重新勾选。" }
  ],

  customizationModules: [],
  projectCases: [],

  contact: {
    enabled: true,
    kicker: "还有入学问题？",
    title: "微信联系浪花",
    label: "查看微信二维码",
    url: "#wechat"
  },

  legal: {
    disclaimer: "非官方新生攻略页，学校年度安排以当年正式通知为准。",
    footerNote: "非官方新生攻略页 · 重要安排以学校正式通知为准"
  }
};
