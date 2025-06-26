interface HeaderConfig {
    title : string;
    backButtonIcon : React.ReactNode;
}

const DefaultBackButtonIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
    />
</svg>

export const headerConfigs: Record<string, HeaderConfig> = {
    '/leave/apply' : {
        title : '휴가 신청',
        backButtonIcon : DefaultBackButtonIcon
    }
}