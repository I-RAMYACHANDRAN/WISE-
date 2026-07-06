import {
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";

function GalleryCard({image,onClick}){

    return(

        <Card

            onClick={onClick}

            sx={{

                borderRadius:4,

                cursor:"pointer",

                transition:".25s",

                "&:hover":{

                    transform:"translateY(-5px)",

                    boxShadow:6

                }

            }}

        >

            <CardMedia

                component="img"

                image={image.image}

                height="240"

            />

            <CardContent>

                <Typography
                    fontWeight={700}
                >
                    {image.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {image.description}
                </Typography>

            </CardContent>

        </Card>

    )

}

export default GalleryCard;