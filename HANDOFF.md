# Forge Fitness handoff

Last updated: July 28, 2026

This file is the recovery point for continuing the Forge Fitness Google Play update in a new
session. Do not generate another Android upload key or upload another bundle for version code `2`.
The replacement key is active, and the API 36 production release has been submitted to Google.

## Repository and app identity

- GitHub repository: <https://github.com/jmaietta/fitness>
- Production website: <https://www.forgebodyfit.com/>
- Android package: `com.forgebodyfit.www.twa`
- Google Play app: Forge Fitness

## Current status

### Website association and credential sharing

- The Android association file is live at
  <https://www.forgebodyfit.com/.well-known/assetlinks.json>.
- It responds directly with HTTP 200 and `application/json`.
- It includes both `delegate_permission/common.handle_all_urls` and
  `delegate_permission/common.get_login_creds`.
- Google's Digital Asset Links API confirmed both relations as linked on July 26, 2026.
- The website association uses the Google Play app-signing certificate, not the upload
  certificate.
- Relevant commits:
  - `34001aa` - Fix Android credential sharing
  - `1abf311` - Publish Android association file

If credential sharing has not yet been enabled in Play Console, the **Turn on credential sharing**
button is safe to use.

### Android 16 rebuild

- Android source now lives in the repository under `android/`.
- Rebuild commit: `d5847c7` - Rebuild Android app for API 36
- Version code: `2`
- Version name: `1.0.1.0`
- Compile SDK: `36`
- Target SDK: `36`
- Minimum SDK: `23`
- Successful GitHub Actions run:
  <https://github.com/jmaietta/fitness/actions/runs/30204755097>
- Signed bundle artifact SHA-256:
  `6F34245C01EAD8BB0D67D6F720973E2EF06C93F7B067D1D9A24B1A2C0FAC5B16`

### Signing keys

Do not change the Google Play app-signing key.

- Google Play app-signing SHA-256:
  `65:DC:33:1D:DF:13:C4:50:FD:6C:96:74:78:66:07:40:BD:EF:4A:4F:BA:31:90:9E:26:20:D7:82:7F:0A:4B:A0`
- Lost/old upload-key SHA-256:
  `54:01:60:EE:70:94:9E:C8:FD:59:3C:8D:02:D3:E5:D7:3B:9A:AD:0D:84:6D:28:11:C7:43:25:25:83:70:CF:10`
- New upload-key SHA-256:
  `B5:81:D5:68:15:F7:79:83:8C:F8:82:2F:5D:94:86:AA:93:FB:0D:8B:E3:49:0B:1B:3C:88:9B:36:6B:57:ED:B9`
- New upload-key SHA-1:
  `F3:01:54:19:60:4D:BB:29:90:19:C5:1C:1B:B5:48:C5:C8:9D:0A:0B`

The new upload key was generated with a random password. The user does not need to know or retain
that password. The key material and password are stored as encrypted GitHub Actions secrets:

- `FORGE_UPLOAD_KEYSTORE_BASE64`
- `FORGE_UPLOAD_STORE_PASSWORD`
- `FORGE_UPLOAD_KEY_ALIAS`
- `FORGE_UPLOAD_KEY_PASSWORD`

The public reset certificate is committed at `android/upload_certificate.pem`. No private
keystore or password is committed to Git.

## Google Play submission status

The upload-key reset requested on July 26, 2026 became active on July 28, 2026 at 2:28 PM UTC /
10:28 AM EDT. Play Console displayed the new upload certificate, and the signed bundle was
accepted successfully.

- Production release version code: `2`
- Production release version name: `1.0.1.0`
- Target SDK confirmed by Play Console: `36`
- Supported Android API levels: `23+`
- Supported-device comparison: no previously supported devices were removed
- Rollout: full production rollout
- Managed publishing: off
- Submitted for review: July 28, 2026 at approximately 12:05 PM EDT
- Current state at handoff update: **Changes in review**, with Google Play quick checks running

Because managed publishing is off, Google Play will automatically publish version `2` after it
passes quick checks and review. Do not select **Remove changes**.

## Exact next steps

1. Sign in to Play Console as the developer account owner, `jmaietta@ceorater.com`.
2. Open Forge Fitness **Publishing overview** and monitor version `2` under **Changes in review**.
3. Do not remove the change or create another release while this submission is being reviewed.
4. If Google reports an error or rejection, capture the complete message before changing anything.
5. After approval, confirm production shows version `2 (1.0.1.0)` as active.
6. Confirm the Android 16 / API level 36 policy issue is cleared.
7. Review any remaining recommendations separately; the three warnings displayed before this
   upload were attached to the previous version `1` and were not blocking errors.

The public reset certificate is also available locally at:

`C:\Users\jmaie\Downloads\Forge-Fitness-upload-certificate.pem`

## Rebuilding later

GitHub Actions workflow: `.github/workflows/build-android.yml`

It builds and signs the Android App Bundle using encrypted repository secrets. It runs when the
Android project changes on `main`, or it can be started from **GitHub > Actions > Build Forge
Fitness Android > Run workflow**. Download the resulting `forge-fitness-api36-v2` artifact.

For any release after version code `2`, increment `versionCode` in `android/app/build.gradle` and
`appVersionCode` in `android/twa-manifest.json` before building. Google Play does not accept a
version code that has already been uploaded.

## Instructions for a new assistant session

1. Read this file before changing or regenerating anything.
2. Check the production submission status in Play Console.
3. Do not create another keystore, request another reset, or re-upload version code `2`.
4. If version `2` is approved, verify that it is active and the API 36 policy issue is cleared.
5. Update this handoff file after approval or if Play Console reports a blocker.
