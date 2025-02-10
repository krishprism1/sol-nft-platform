"use client"
import Header from '@/components/common/Header'
import React, { useEffect, useState } from 'react'
import "./page.css"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Spinner from '@/components/common/Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import "../../responsive/pageresponsive.css"
import UpdateTime from '@/components/contractInteraction/UpdateTime';
import Initialize from '@/components/contractInteraction/Initialize';
import InitializeRandomState from '@/components/contractInteraction/InitializeRandomState';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "6px"
};

interface Prize {
  id: string;
  randomId: number;
  prize: number;
}

interface Meta {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

interface PrizeResponse {
  data: Prize[];
  meta: Meta;
}


const Dashboard = () => {
  const router = useRouter()
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prizeList, setPrizeList] = useState<PrizeResponse | undefined>(undefined);
  const [prizes, setPrizes] = useState({
    randomId: "",
    prize: "",
  });

  useEffect(() => {
    getUserDetails()
  }, [])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onSubmit = async () => {
    try {
      setLoading(true)
      await axios.post("/api/prize/create", prizes);
      toast.success("Number added.")
      handleClose()
      await listPrizes()
    } catch (error: unknown) {
      //@ts-expect-error tyep issys
      toast.error(error.response.data.msg)
    } finally {
      setLoading(false)
    }
  }

  const listPrizes = async () => {
    try {
      setLoading(true)
      const list = await axios.get(`/api/prize/list?page=${page}`);
      setPrizeList(list.data)
    } catch (error: unknown) {
      //@ts-expect-error tyep issys
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserDetails()
    listPrizes()
  }, [page])

  const getUserDetails = async () => {
    try {
      await axios.get('/api/me')
    } catch (error) {
      console.log(error)
      router.push("/admin/login")
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await axios.get('/api/logout')
      router.push("/admin/login")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className='dashboard-container'>
        <div className="dashbord-box">

          <div className='div'>
            <div className="dashbord-box11">
              <h4>#</h4>
            </div>
            <div className="dashbord-box22">
              <h4>Prize(USD)</h4>
            </div>
            <div className="dashbord-box33">
              <h4>Number</h4>
            </div>
          </div>
          {
            prizeList ? <div className='dashboard-table'>
              {
                prizeList?.data?.map((item, index) => (
                  <div key={index}>
                    <span style={{ width: "10%", textAlign: "center" }}>{index + 1}</span>
                    <span style={{ width: "45%" }}>{item.prize}</span>
                    <span style={{ width: "45%", textAlign: "center" }}>#{item?.randomId}</span>
                  </div>
                ))
              }
            </div> :
              <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spinner />
              </div>
          }

          <div className='number-column-btn'>
            <Stack spacing={2}>
              <Pagination count={prizeList?.meta?.totalPages} page={page} onChange={handleChange} variant="outlined" color="primary" />
            </Stack>
          </div>
        </div>
        <div className='button-conatiner'>
          <button className='popup-btn' onClick={() => logout()}>Logout</button>
          <button className='popup-btn' onClick={handleOpen}>Add Number</button>
          <Initialize />
          <InitializeRandomState />
          <UpdateTime />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="popup-container">
            <form className="form">
              <p className="form-title">Add Number</p>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Enter random number"
                  value={prizes.randomId}
                  required
                  onChange={(e) => setPrizes({ ...prizes, randomId: e.target.value })}
                />
                <span>
                </span>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Enter prize"
                  value={prizes.prize}
                  required
                  onChange={(e) => setPrizes({ ...prizes, prize: e.target.value })}
                />
              </div>
              <div className='submit-btn-box'>
                <button
                  className="submit"
                  onClick={onSubmit}
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Add"}
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>

    </>
  )
}

export default Dashboard
