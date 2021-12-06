import React from "react";
import {Box,BottomNavigation,BottomNavigationAction} from "@material-ui/core";

class View extends React.Component {
    //
    render() {
        return (
            <>
                <Box sx={{width: "auto"}}>
                    <BottomNavigation showLabels>
                        <BottomNavigationAction  label="main"/>
                        <BottomNavigationAction  label="Restaurant"/>
                        <BottomNavigationAction  label="Cafe"/>
                    </BottomNavigation>
                </Box>
            </>
        )
    }
}
export default View;