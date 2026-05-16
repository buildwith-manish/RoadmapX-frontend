# ==============================================================================
# RoadmapX ProGuard Rules
# ==============================================================================

# Preserve line numbers for debugging stack traces
-keepattributes SourceFile,LineNumberTable

# Hide original source file name
-renamesourcefileattribute SourceFile

# ==============================================================================
# Capacitor Core Classes
# ==============================================================================

-keep class com.getcapacitor.** { *; }
-keep class com.capacitorjs.** { *; }
-keepclassmembers class com.getcapacitor.** { *; }
-keepclassmembers class com.capacitorjs.** { *; }

# Keep Capacitor plugin registry
-keep class * extends com.getcapacitor.Plugin { *; }
-keepclassmembers class * extends com.getcapacitor.Plugin {
    @com.getcapacitor.annotation.CapacitorPlugin <methods>;
    @com.getcapacitor.annotation.ActivityCallback <methods>;
}

# Keep Capacitor plugin annotations
-keep class com.getcapacitor.annotation.** { *; }
-keepclassmembers class @com.getcapacitor.annotation.CapacitorPlugin * {
    *;
}

# ==============================================================================
# Google Auth Classes
# ==============================================================================

-keep class com.codetrix.studio.capacitor.googleauth.** { *; }
-keep class com.google.android.gms.auth.** { *; }
-keep class com.google.android.gms.common.** { *; }
-keep class com.google.android.gms.identity.** { *; }
-keepclassmembers class com.google.android.gms.auth.** { *; }
-keepclassmembers class com.google.android.gms.common.** { *; }

# ==============================================================================
# JavaScript Interface Classes
# ==============================================================================

-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

-keep class **.WebAppInterface { *; }
-keepclassmembers class **.WebAppInterface { *; }

# ==============================================================================
# All Capacitor Plugin Classes
# ==============================================================================

-keep class com.capacitorjs.plugins.splashscreen.** { *; }
-keep class com.capacitorjs.plugins.statusbar.** { *; }
-keep class com.capacitorjs.plugins.app.** { *; }
-keep class com.capacitorjs.plugins.network.** { *; }
-keep class com.capacitorjs.plugins.toast.** { *; }
-keep class com.capacitorjs.plugins.haptics.** { *; }
-keep class com.capacitorjs.plugins.pushnotifications.** { *; }
-keep class com.capacitorjs.plugins.localnotifications.** { *; }
-keep class com.capacitorjs.plugins.share.** { *; }
-keep class com.capacitorjs.plugins.browser.** { *; }

# ==============================================================================
# WebView Related Classes
# ==============================================================================

-keep class android.webkit.** { *; }
-keep class androidx.webkit.** { *; }
-keepclassmembers class androidx.webkit.** { *; }

# ==============================================================================
# Standard Android Keep Rules
# ==============================================================================

# Keep application class
-keep class com.roadmapx.app.MainActivity { *; }
-keep class com.roadmapx.app.** { *; }

# Keep R classes
-keepclassmembers class **.R$* {
    public static <fields>;
}

# Keep parcelable classes
-keepclassmembers class * implements android.os.Parcelable {
    public static final ** CREATOR;
}

# Keep serializable classes
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    !static !transient <fields>;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# Keep enum classes
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep view constructors
-keepclasseswithmembers class * {
    public <init>(android.content.Context, android.util.AttributeSet);
}

-keepclasseswithmembers class * {
    public <init>(android.content.Context, android.util.AttributeSet, int);
}

# Keep onClick handlers
-keepclassmembers class * extends android.app.Activity {
    public void *(android.view.View);
}

# Keep onClick annotations
-keepclassmembers class * {
    public void on*Click(android.view.View);
}

# ==============================================================================
# Cordova Plugin Classes
# ==============================================================================

-keep class org.apache.cordova.** { *; }
-keep class **.cordova.** { *; }
-keepclassmembers class org.apache.cordova.** { *; }
