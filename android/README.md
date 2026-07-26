# Forge Fitness Android wrapper

This directory contains the Trusted Web Activity wrapper for the Forge Fitness web app.

## Release identity

- Application ID: `com.forgebodyfit.www.twa`
- Website: `https://www.forgebodyfit.com/`
- Current version code: `2`
- Current version name: `1.0.1.0`
- Compile SDK: `36`
- Target SDK: `36`
- Minimum SDK: `23`

## Updating the wrapper

The project was generated with Bubblewrap. Update `twa-manifest.json`, regenerate the project, and
confirm that `app/build.gradle` still uses `targetSdkVersion 36` or newer before building. Bubblewrap
1.24.1 currently regenerates that line as API 35.

The release bundle is built and signed by the `Build Forge Fitness Android` GitHub Actions workflow.
The upload key and its generated password are stored as encrypted repository secrets. Keystores,
passwords, and build artifacts are intentionally excluded from Git.

The public `upload_certificate.pem` file is safe to keep in the repository and is used only when
registering or resetting the upload key in Google Play Console.
