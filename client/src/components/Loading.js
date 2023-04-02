import React from 'react'
import styled from 'styled-components'
import HashLoader from "react-spinners/HashLoader";
import Backdrop from '@mui/material/Backdrop';
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`;

const Loading = () => {

  return (
    <Loader>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
        >
            <HashLoader
                color="#bbfff1"
                speedMultiplier={1}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            /> 
        </Backdrop>
    </Loader>
  )
}

export default Loading
