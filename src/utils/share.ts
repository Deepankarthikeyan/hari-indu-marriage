export async function shareInvitation(title: string, text: string): Promise<boolean> {
  const url = window.location.href
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
      return true
    } catch (e) {
      if ((e as Error).name === 'AbortError') return false
    }
  }
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch {
    return false
  }
}
