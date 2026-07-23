# 🚀 CodeSimple Library (v0.0.3)

مكتبة جافا سكريبت خفيفة ومفتوحة المصدر (Open Source) مصممة لتسهيل كتابة الأكواد، توفير الاختصارات، تنظيم المشروع في صفحة واحدة، والتعامل السلس مع السيرفرات والتخزين المحلي.

---

## 📌 الميزات الرئيسية (Goals)
1. **تسهيل كتابة الكود:** التخلص من الأكواد الطويلة والمكررة.
2. **توفير الاختصارات:** دوال سريعة للتعامل مع الـ DOM والـ LocalStorage.
3. **سرعة التطوير:** بناء واجهات المستخدم وتحديثها ديناميكياً في ثوانٍ.
4. **دعم اللغة العربية:** ميزة ذكية لتنظيف وتوحيد النصوص العربية عند المقارنة أو البحث.

---

## 🛠️ دليل استخدام الدوال (API Reference)

### 1. اختصارات التعامل مع الـ DOM
بدلاً من كتابة الأوامر الطويلة المعتادة في Vanilla JS، توفر لك المكتبة هذه الاختصارات:

* `$(id)` -> بديل لـ `document.getElementById(id)`
* `getClass(class_name)` -> بديل لـ `document.querySelector('.class_name')`
* `getClassAll(class_name)` -> بديل لـ `document.querySelectorAll('.class_name')`
* `create(element)` -> بديل لـ `document.createElement(element)`
* `addClass(element, class_name)` -> إضافة كلاس للعنصر.
* `removeClass(element, class_name)` -> حذف كلاس من العنصر.

#### 🔹 دالة حقن الـ HTML مباشرة: `returnHTML(HTMLelements)`
تسمح لك بكتابة هيكل الصفحة كاملة داخل ملف الجافا سكريبت، حيث تقوم بإنشاء وسم `<section>` وتحقن الأكواد بداخله وتضيفها للـ `body`.
```javascript
returnHTML(`
    <div class="app-title">قائمة المهام اليومية</div>
    <div class="container"></div>
`);
```

---

### 2. دالة العرض الذكي وتحديث البيانات: `render()`
تغنيك هذه الدالة عن كتابة حلقات التكرار (Loops) اليدوية لتحديث الواجهة. تأخذ الدالة: (العارض المستهدف، مصفوفة البيانات، دالة التصميم، رسالة مخصصة في حال فراغ البيانات).

```javascript
render(container, tasks, (item, index) => `
    <div>${index + 1}. ${item}</div>
`, `<h3>لا توجد مهام حالياً!</h3>`);
```

---

### 3. كلاس التعامل مع السيرفر: `Server`
يحتوي على دالات معالجة مدمجة بالـ `Async/Await` ، ومجهزة مسبقاً للتعامل مع أخطاء الاتصال بالسيرفر لإرسال واستقبال البيانات من الـ APIs الخارجية:

* **`get(url)`**: لجلب البيانات أونلاين، وتقوم الدالة تلقائياً بتحويل الكائنات (Objects) إلى مصفوفات (Arrays) لتبسيط التعامل معها.
* **`post(url, data)`**: لإرسال وتخزين البيانات على السيرفر بصيغة JSON.

```javascript
import { Server } from './code-simple.js';
const srv = new Server();

// جلب البيانات
const data = await srv.get("https://example.com");
```

---

### 4. دالة التأخير المدمجة: `debounce()`
يتم استدعاؤها عندما تتطلب معالجة البيانات الانتظار حتى تكون القيم جاهزة بحالة كانت المدخلات تتغير باستمرار مثل احداث الإدخال، حيث لا تقوم بتشغيل الدالة المحجوزة داخلها إلا بعد ثبات القيم لمدة معينة تحددها أثناء استدعاء الدالة وتكتب هكذا:
```javascript
$("inp").oninput = () => debounce(function, deley);
```

---

### 5. كلاس الميزات المتقدمة: `CodeSimple`
يتم استدعاؤه كـ `Class` يحتوي على وظائف التخزين ومعالجة النصوص:

* **`getStorage(name)`**: جلب المصفوفات من الـ LocalStorage وتحويلها تلقائياً لكود JS عبر `JSON.parse`.
* **`setStorage(name, array)`**: حفظ المصفوفات في ذاكرة المتصفح مباشرة.
* **`clearText(text)`**: دالة ممتازة لتنظيف النصوص العربية (تحويل "ة" إلى "هـ"، و "أ/إ/آ" إلى "ا"، وإزالة الفراغات وتحويل الحروف الإنجليزية لصغيرة) لتسهيل عمليات البحث بدقة.
* **`copyText(text)`**: نسخ أي نص إلى حافظة الجهاز (Clipboard) بضغط زر واحدة.

---

## 💡 مثال تطبيقي كامل (To-Do List)

إليك كيف يصبح كود تطبيق مهام كامل وبسيط باستخدام المكتبة:

```javascript
import CodeSimple, { $, getClass, returnHTML, render } from "./code-simple.js";

// 1. بناء الواجهة
returnHTML(`
    <input id="inp" placeholder="أدخل المهمة">
    <button id="add">+</button>
    <div class="container"></div>
`);

const csimple = new CodeSimple();
const container = getClass("container");
let tasks = csimple.getStorage("tasks");

// 2. دالة عرض البيانات
function renderTasks() {
    render(container, tasks, (item, index) => `
        <p>${item} <button onclick="del(${index})">حذف</button></p>
    `, "<h3>القائمة فارغة</h3>");
}

// 3. إضافة مهمة جديدة
$("add").onclick = () => {
    let value = csimple.clearText(\$("inp").value); // تنظيف النص العربي
    if (value) {
        tasks.push(value);
        csimple.setStorage("tasks", tasks);
        \$("inp").value = "";
        renderTasks();
    }
}

// 4. حذف مهمة (جعل الدالة عالمية ليراها كود الـ HTML)
window.del = function(i) {
    tasks.splice(i, 1);
    csimple.setStorage("tasks", tasks);
    renderTasks();
}

renderTasks();
```
