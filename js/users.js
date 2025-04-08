// نظام إدارة المستخدمين
// يستخدم localStorage لتخزين بيانات المستخدمين

// دالة للتحقق من وجود مستخدمين مسجلين مسبقاً
function checkExistingUsers() {
  if (!localStorage.getItem('users')) {
    // إنشاء مصفوفة فارغة للمستخدمين إذا لم تكن موجودة
    localStorage.setItem('users', JSON.stringify([]));
  }
}

// دالة لإضافة مستخدم جديد
function registerUser(username, password) {
  // التأكد من وجود مصفوفة المستخدمين
  checkExistingUsers();
  
  // الحصول على مصفوفة المستخدمين الحالية
  const users = JSON.parse(localStorage.getItem('users'));
  
  // التحقق من عدم وجود اسم المستخدم مسبقاً
  const userExists = users.some(user => user.username === username);
  
  if (userExists) {
    return {
      success: false,
      message: 'اسم المستخدم موجود بالفعل، يرجى اختيار اسم آخر'
    };
  }
  
  // إضافة المستخدم الجديد
  users.push({
    username: username,
    password: password
  });
  
  // حفظ المصفوفة المحدثة
  localStorage.setItem('users', JSON.stringify(users));
  
  return {
    success: true,
    message: 'تم إنشاء الحساب بنجاح'
  };
}

// دالة للتحقق من بيانات تسجيل الدخول
function loginUser(username, password) {
  // التأكد من وجود مصفوفة المستخدمين
  checkExistingUsers();
  
  // الحصول على مصفوفة المستخدمين
  const users = JSON.parse(localStorage.getItem('users'));
  
  // البحث عن المستخدم
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    return {
      success: true,
      message: 'تم تسجيل الدخول بنجاح'
    };
  } else {
    return {
      success: false,
      message: 'اسم المستخدم أو كلمة المرور غير صحيحة'
    };
  }
}

// إضافة بعض المستخدمين الافتراضيين للاختبار
function addDefaultUsers() {
  checkExistingUsers();
  const users = JSON.parse(localStorage.getItem('users'));
  
  // إضافة مستخدم افتراضي فقط إذا كانت القائمة فارغة
  if (users.length === 0) {
    users.push({
      username: 'admin',
      password: 'admin123'
    });
    
    users.push({
      username: 'طالب',
      password: '123456'
    });
    
    localStorage.setItem('users', JSON.stringify(users));
  }
}

// استدعاء دالة إضافة المستخدمين الافتراضيين عند تحميل الملف
addDefaultUsers();
