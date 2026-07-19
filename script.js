const taskData = {
  before: {
    kicker: "Before Campus",
    title: "出发前 48 小时，把不能补的东西先放好",
    list: [
      "录取通知书、身份证、证件照、档案相关材料分开放，手机里同步保存电子照片。",
      "导航收藏“山西工程科技职业大学”，地址以晋中市榆次区文华街 369 号为准，出行前再确认当年接站和入校要求。",
      "生活用品先带刚需：换洗衣物、充电器、常用药、水杯、雨具。大件收纳到校后看宿舍尺寸再买。",
      "提前关注学校官网、招生信息网和学院通知，不只依赖二手群消息。"
    ],
    tip: "出发前不要把所有快递一次寄到学校。宿舍号和取件点确认后再下单，能减少排队和找件时间。"
  },
  report: {
    kicker: "Report Day",
    title: "报到日先跟学院流程走，不急着办额外项目",
    list: [
      "进校后先找学院迎新点，完成身份核验，确认班级群、辅导员、宿舍和当天集合安排。",
      "缴费、校园卡、体检、军训服装等事项按现场指引逐项确认，遇到不清楚的先问迎新志愿者。",
      "家长同行时提前约定校内集合点，搬行李前先确认宿舍楼和床位，避免走回头路。",
      "当天任何涉及转账、贷款、电话卡、兼职押金的消息，都先暂停并向辅导员核实。"
    ],
    tip: "报到日最重要的是跟紧官方和学院通知，避免被临时摊位或非官方收费项目打乱节奏。"
  },
  dorm: {
    kicker: "Dorm Setup",
    title: "宿舍先保证能睡、能洗、能充电，再慢慢升级",
    list: [
      "床品、洗漱包、拖鞋、衣架、纸巾、垃圾袋优先级最高，其他装饰类用品可以延后。",
      "插排、电吹风、锅具等电器先看宿舍管理规定，违规电器不要带也不要买。",
      "收纳用品少量先买，等看到柜子、桌面和床下空间后再补，尺寸会更准确。",
      "和舍友早一点约定卫生轮值、作息声音、空调或风扇使用习惯。"
    ],
    tip: "宿舍不是一天布置完的。第一周的真实需求，比开学前的购物清单更可靠。"
  },
  study: {
    kicker: "First Classes",
    title: "开课前跑通账号、教室和通知渠道",
    list: [
      "第一周重点确认课表、教学楼位置、任课老师通知渠道和临时调课消息。",
      "教务系统、校园网、邮箱、学习平台等账号尽早登录一次，避免交作业时才发现问题。",
      "教材先等班级或老师确认版本，不急着一次买齐。",
      "图书馆、自习空间、实训室、机房和常用打印点，可以在第一周顺路摸清。"
    ],
    tip: "大学学习怕信息漏看。班级群、学院网站、教务通知建议每天固定查看一次。"
  },
  safety: {
    kicker: "Safety Check",
    title: "钱、证件、账号、隐私，开学季多核实一步",
    list: [
      "任何要求私下转账、缴押金、开贷款、刷流水、代缴费的消息，都先截图再核实。",
      "校园卡、身份证、银行卡、学生证不要借给陌生人使用，也不要随手拍照发群里。",
      "兼职要看地点、合同、薪资结算方式，不交培训费，不交保证金。",
      "身体不适、财物丢失、矛盾纠纷，及时联系辅导员、宿管或学校相关部门。"
    ],
    tip: "真实老师和学校部门不会催促学生私下转账。拿不准就先停下，找辅导员确认。"
  }
};

const taskButtons = document.querySelectorAll("[data-task]");
const taskKicker = document.querySelector("#task-kicker");
const taskTitle = document.querySelector("#task-title");
const taskList = document.querySelector("#task-list");
const taskTip = document.querySelector("#task-tip");

function renderTask(key) {
  const task = taskData[key];
  if (!task) return;

  taskButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.task === key);
  });

  taskKicker.textContent = task.kicker;
  taskTitle.textContent = task.title;
  taskList.innerHTML = task.list.map((item) => `<li>${item}</li>`).join("");
  taskTip.textContent = task.tip;
}

taskButtons.forEach((button) => {
  button.addEventListener("click", () => renderTask(button.dataset.task));
});

document.querySelectorAll(".checks input").forEach((checkbox, index) => {
  const storageKey = `sxgkd-freshman-check-${index}`;
  checkbox.checked = window.localStorage.getItem(storageKey) === "1";
  checkbox.addEventListener("change", () => {
    window.localStorage.setItem(storageKey, checkbox.checked ? "1" : "0");
  });
});

renderTask("before");
