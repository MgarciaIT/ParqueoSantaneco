import "./footer.scss"
import { Container, Typography } from '@mui/material'

function Footer(){
    return (
        <footer className="footer">
            <Container maxWidth='sm'>
                <Typography align="center">
                    PartsPlus © {new Date().getFullYear()}
                </Typography>
            </Container>
        </footer>
    )
}

export default Footer