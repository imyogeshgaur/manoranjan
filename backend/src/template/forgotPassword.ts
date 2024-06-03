export const forgetPasswordTemplate = (userId: any, userName: any) => {
    return `
<html>
<head>
</head>
<body>
    Dear ${userName} we received a password Reset Request From you.<br>
    The Password Reset Link is : <br>
    http://localhost:5173/resetPassword/${userId}<br>
    Thanks and Regards
    <br>
    Team Manoranjan
</body>
`
}