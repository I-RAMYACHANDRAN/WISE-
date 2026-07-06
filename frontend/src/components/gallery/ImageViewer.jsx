import {
    Dialog,
    DialogContent,
    IconButton,
    Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

function ImageViewer({

    open,

    image,

    onClose,

}){

    if(!image) return null;

    return(

        <Dialog

            open={open}

            onClose={onClose}

            maxWidth="lg"

            fullWidth

        >

            <IconButton

                sx={{

                    position:"absolute",

                    right:10,

                    top:10,

                }}

                onClick={onClose}

            >

                <CloseIcon/>

            </IconButton>

            <DialogContent>

                <img

                    src={image.image}

                    alt={image.title}

                    style={{

                        width:"100%",

                        borderRadius:"10px"

                    }}

                />

                <Typography

                    variant="h5"

                    mt={3}

                    fontWeight={700}

                >

                    {image.title}

                </Typography>

                <Typography>

                    {image.description}

                </Typography>

            </DialogContent>

        </Dialog>

    )

}

export default ImageViewer;