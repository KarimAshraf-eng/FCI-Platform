import os
import pyperclip
import keyboard
import re

# مسار مجلد المحاضرة الأساسي
LECTURE_FOLDER = r"D:\My Work\FCI-Platform\Subjects\WebAnalytics\Lectures\Lecture_1\Lecture"

def get_current_target_number(lecture_dir):
    """دالة ذكية: بتجيب دايماً الرقم اللي المفروض نشتغل عليه دلوقتي"""
    max_num = 0
    if not os.path.exists(lecture_dir):
        os.makedirs(lecture_dir)
        return 1
        
    folders = [f for f in os.listdir(lecture_dir) if f.startswith("Slide_")]
    if not folders:
        return 1
        
    for folder_name in folders:
        try:
            num = int(folder_name.split("_")[1])
            if num > max_num:
                max_num = num
        except (ValueError, IndexError):
            pass
    
    # هنا الفكرة: السكربت بيشوف آخر رقم موجود فعلاً في المجلدات ويشتغل عليه
    return max_num

def clean_code(text, lang):
    """تنظيف الكود من علامات النسخ الخاصة بـ Gemini"""
    text = re.sub(rf"```{lang}\n?", "", text, flags=re.IGNORECASE)
    text = re.sub(r"```", "", text)
    return text.strip()

def get_paths():
    """بتجيب المسارات الصحيحة بناءً على الوضع الحالي للمجلدات"""
    current_num = get_current_target_number(LECTURE_FOLDER)
    folder = os.path.join(LECTURE_FOLDER, f"Slide_{current_num}")
    os.makedirs(folder, exist_ok=True)
    
    html_path = os.path.join(folder, f"slide_{current_num}_page.html")
    css_path = os.path.join(folder, f"slide_{current_num}_design.css")
    return html_path, css_path, current_num

def save_html():
    html_path, _, num = get_paths()
    content = pyperclip.paste()
    cleaned = clean_code(content, "html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(cleaned)
    print(f"✅ [Alt+H] تم الحفظ في HTML -> Slide_{num}")

def save_css():
    _, css_path, num = get_paths()
    content = pyperclip.paste()
    cleaned = clean_code(content, "css")
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(cleaned)
    print(f"✅ [Alt+C] تم الحفظ في CSS -> Slide_{num}")

def clear_files():
    html_path, css_path, num = get_paths()
    if os.path.exists(html_path):
        with open(html_path, "w", encoding="utf-8") as f: f.write("")
    if os.path.exists(css_path):
        with open(css_path, "w", encoding="utf-8") as f: f.write("")
    print(f"🗑️ [Alt+D] تم تفريغ ملفات Slide_{num}")

def create_new_slide():
    """الاختصار ده وظيفته بس يفتح مجلد برقم جديد"""
    current_max = get_current_target_number(LECTURE_FOLDER)
    next_num = current_max + 1
    new_folder = os.path.join(LECTURE_FOLDER, f"Slide_{next_num}")
    os.makedirs(new_folder, exist_ok=True)
    print(f"✨ [Alt+N] تم فتح شريحة جديدة برقم: Slide_{next_num}")

# ربط الاختصارات
keyboard.add_hotkey('alt+h', save_html)
keyboard.add_hotkey('alt+c', save_css)
keyboard.add_hotkey('alt+d', clear_files)
keyboard.add_hotkey('alt+n', create_new_slide)

print("🚀 نظام الاختصارات الذكي جاهز!")
print("-" * 50)
print("💡 كيف يعمل الآن:")
print("1. لو عندك Slide_12، السكربت هيحفظ أوتوماتيك جواها.")
print("2. لو ضغطت Alt+N، هيفتح لك Slide_13 ويبدأ يحفظ جواها.")
print("3. لو مسحت Slide_13 يدوي، السكربت هيفهم ويرجع يحفظ في Slide_12.")
print("-" * 50)

keyboard.wait()