package com.roadmapx.app

import android.app.AlertDialog
import android.os.Build
import android.os.Bundle
import android.webkit.CookieManager
import android.webkit.WebView
import androidx.core.view.WindowCompat
import com.getcapacitor.BridgeActivity

class MainActivity : BridgeActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Register Capacitor plugins
        registerPlugin(com.capacitorjs.plugins.splashscreen.SplashScreenPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.statusbar.StatusBarPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.app.AppPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.network.NetworkPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.toast.ToastPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.haptics.HapticsPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.pushnotifications.PushNotificationsPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.localnotifications.LocalNotificationsPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.share.SharePlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.browser.BrowserPlugin::class.java)
        registerPlugin(com.codetrix.studio.capacitor.googleauth.CapacitorGoogleAuth::class.java)

        // Edge-to-edge support
        WindowCompat.setDecorFitsSystemWindows(window, false)

        // Set navigation bar and status bar colors
        window.navigationBarColor = android.graphics.Color.parseColor("#05050f")
        window.statusBarColor = android.graphics.Color.parseColor("#05050f")

        // Configure WebView settings
        bridge.webView?.let { webView ->
            webView.settings.domStorageEnabled = true
            webView.settings.javaScriptEnabled = true
            webView.settings.allowFileAccess = true
            webView.settings.mixedContentMode = android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW

            // Cookie manager settings
            CookieManager.getInstance().setAcceptCookie(true)
            CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true)
        }

        // Override back button behavior
        onBackPressedDispatcher.addCallback(this, object : androidx.activity.OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                val webView = bridge.webView
                if (webView != null && webView.canGoBack()) {
                    webView.goBack()
                } else {
                    showExitConfirmation()
                }
            }
        })
    }

    private fun showExitConfirmation() {
        AlertDialog.Builder(this)
            .setTitle("Exit RoadmapX")
            .setMessage("Are you sure you want to exit?")
            .setPositiveButton("Exit") { _, _ ->
                finish()
            }
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .setCancelable(true)
            .show()
    }
}
