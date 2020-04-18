export function useNavigate() {
    return href => document.location.href = href
}

export function useNavigateLogin() {
    const navigate = useNavigate()

    return () => navigate('#/login')
}
