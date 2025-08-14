// Google Drive API integration for data backup
let gapi: any = null
let isInitialized = false

export const initializeGoogleDrive = async (): Promise<boolean> => {
  try {
    if (typeof window === "undefined") return false

    // Load Google API
    if (!window.gapi) {
      await new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = "https://apis.google.com/js/api.js"
        script.onload = resolve
        document.head.appendChild(script)
      })
    }

    gapi = window.gapi

    await new Promise((resolve) => gapi.load("client:auth2", resolve))

    await gapi.client.init({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY,
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      scope: "https://www.googleapis.com/auth/drive.file",
    })

    isInitialized = true
    return true
  } catch (error) {
    console.error("Failed to initialize Google Drive:", error)
    return false
  }
}

export const authenticateGoogleDrive = async (): Promise<boolean> => {
  try {
    if (!isInitialized) {
      await initializeGoogleDrive()
    }

    const authInstance = gapi.auth2.getAuthInstance()
    if (!authInstance.isSignedIn.get()) {
      await authInstance.signIn()
    }

    return authInstance.isSignedIn.get()
  } catch (error) {
    console.error("Failed to authenticate with Google Drive:", error)
    return false
  }
}

export const saveData = async (fileName: string, data: any): Promise<boolean> => {
  try {
    // Always save to localStorage first
    localStorage.setItem(fileName, JSON.stringify(data))

    // Try to save to Google Drive if authenticated
    if (isInitialized && gapi) {
      const authInstance = gapi.auth2.getAuthInstance()
      if (authInstance.isSignedIn.get()) {
        const fileMetadata = {
          name: `${fileName}.json`,
          parents: ["appDataFolder"],
        }

        const form = new FormData()
        form.append("metadata", new Blob([JSON.stringify(fileMetadata)], { type: "application/json" }))
        form.append("file", new Blob([JSON.stringify(data)], { type: "application/json" }))

        await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
          method: "POST",
          headers: new Headers({
            Authorization: `Bearer ${gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token}`,
          }),
          body: form,
        })
      }
    }

    return true
  } catch (error) {
    console.error("Failed to save data:", error)
    // Return true if localStorage save succeeded
    return localStorage.getItem(fileName) !== null
  }
}

export const loadData = async (fileName: string): Promise<any> => {
  try {
    // Try to load from localStorage first
    const localData = localStorage.getItem(fileName)
    if (localData) {
      return JSON.parse(localData)
    }

    // Try to load from Google Drive if authenticated
    if (isInitialized && gapi) {
      const authInstance = gapi.auth2.getAuthInstance()
      if (authInstance.isSignedIn.get()) {
        const response = await gapi.client.drive.files.list({
          q: `name='${fileName}.json' and parents in 'appDataFolder'`,
          spaces: "appDataFolder",
        })

        if (response.result.files.length > 0) {
          const fileId = response.result.files[0].id
          const fileResponse = await gapi.client.drive.files.get({
            fileId: fileId,
            alt: "media",
          })

          const data = JSON.parse(fileResponse.body)
          // Save to localStorage for faster access
          localStorage.setItem(fileName, JSON.stringify(data))
          return data
        }
      }
    }

    return null
  } catch (error) {
    console.error("Failed to load data:", error)
    return null
  }
}
