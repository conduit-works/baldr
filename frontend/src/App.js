import React from 'react';
import axios from "axios";
import {useState, useEffect } from "react";
import './App.css';
import logo from './images/logo.png'
import discord from './images/discord.png'
import { act } from 'react-dom/test-utils';





const App = () => {
  const [search, setSearch] = useState("");
  const [isSearchToggle, setIsSearchToggle] = useState(false);
  const [ActiveTransation, setActiveTransation] = useState(0);
  const [usernames, setUsernames] = useState([]);
  const [currentTxts, setCurrentTxts] = useState([]);
  
  const handleOnClickTrans = (id) => {
    setActiveTransation(id);
    console.log(ActiveTransation);
    getTnxData(id)
    setIsSearchToggle(false);
  }

  function searchUsername(jsonData, usernameToSearch) {

    if (jsonData.tnxs.hasOwnProperty(usernameToSearch)) {
  
      return jsonData.tnxs[usernameToSearch];
    } else {
  
      return [];
    }
  }
  
  
  function getLastElement(array) {
  
    if (array.length > 0) {
  
      return array[array.length - 1];
    } else {
      
      return undefined;
    }
  }
  
  const getData = async () => {
    const res = await axios.get("https://api.mem.tech/api/state/v_RDVpHFBIDpX1owrBXc59Z1-5O0BmNj8zPNwtNItnY");
    console.log(res.data);
    setUsernames(res.data.tnxs);
    const msg = res.data 
    const jsonData = msg.tnxs
    const username = "spyderweb."
    const valuesArray = searchUsername(res.data, username);
    const lastElement = getLastElement(valuesArray);
    const tnx_link = `https://arweave.net/${lastElement}`
    const resp = await axios.get(tnx_link)
    const msgd = resp.data.content
  }

  const getTnxData = async (tnxId) => {
    const tnx_link = `https://arweave.net/${tnxId}`
    const resp = await axios.get(tnx_link)
    console.log(typeof(resp.data))
    const msgd = resp.data
    setCurrentTxts(msgd)
    console.log(msgd);
  }
  const jsonData2 = {
    "meow": ["0xnom"],
    "spyderweb.": [
      "42huuiWZFcpG4LTwc1P_q-pLKX0bqGLu_g98r-kEZEk",
      "-7AtI3mZhldDVAhZaNqvOJLyne9j73OYpD0Eclh4h38",
      "Vo7ZdTAGPFlpGIcdSot7cehboROZMSisoYhylkaOUNA",
      "cXYcHwE6pc2Kjnbt7oibiQYujEcIV3U4yzqe58a1LSU",
      "tEOJ0BYmsBvRF7qQQuSi2mjfjPwaTgw1LzK6k9FhiJg",
      "AwgTb_1ac-Hnh21hBkV8wL1W7U4tKRwhli4hjaZppus"
    ]
  };


  const SearchToggle = () => {
    return(<div className="searchToggle">
      {
        usernames[search] === undefined ? <div>
          <p>No result found</p>
        </div> :
        <div className='searchresulets'>
             {
              usernames[search]?.map((item, index) => {
                return(
                  <div onClick={() => handleOnClickTrans(item)} className="searchToggle_div">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="37" viewBox="0 0 32 37" fill="none">
                        <path d="M9.33334 10.7917C9.06963 10.7917 8.81184 10.8821 8.59258 11.0515C8.37331 11.2209 8.20242 11.4617 8.1015 11.7434C8.00058 12.0251 7.97418 12.3351 8.02562 12.6341C8.07707 12.9332 8.20406 13.2079 8.39053 13.4235C8.577 13.6391 8.81458 13.7859 9.07322 13.8454C9.33186 13.9049 9.59995 13.8744 9.84358 13.7577C10.0872 13.641 10.2955 13.4434 10.442 13.1899C10.5885 12.9364 10.6667 12.6383 10.6667 12.3334C10.6667 11.9245 10.5262 11.5324 10.2761 11.2433C10.0261 10.9541 9.68696 10.7917 9.33334 10.7917ZM9.33334 16.9584C9.06963 16.9584 8.81184 17.0488 8.59258 17.2182C8.37331 17.3876 8.20242 17.6284 8.1015 17.9101C8.00058 18.1918 7.97418 18.5018 8.02562 18.8008C8.07707 19.0999 8.20406 19.3746 8.39053 19.5902C8.577 19.8058 8.81458 19.9526 9.07322 20.0121C9.33186 20.0716 9.59995 20.041 9.84358 19.9244C10.0872 19.8077 10.2955 19.6101 10.442 19.3565C10.5885 19.103 10.6667 18.805 10.6667 18.5C10.6667 18.0912 10.5262 17.699 10.2761 17.4099C10.0261 17.1208 9.68696 16.9584 9.33334 16.9584ZM22.6667 16.9584H14.6667C14.313 16.9584 13.9739 17.1208 13.7239 17.4099C13.4738 17.699 13.3333 18.0912 13.3333 18.5C13.3333 18.9089 13.4738 19.301 13.7239 19.5902C13.9739 19.8793 14.313 20.0417 14.6667 20.0417H22.6667C23.0203 20.0417 23.3594 19.8793 23.6095 19.5902C23.8595 19.301 24 18.9089 24 18.5C24 18.0912 23.8595 17.699 23.6095 17.4099C23.3594 17.1208 23.0203 16.9584 22.6667 16.9584ZM22.6667 10.7917H14.6667C14.313 10.7917 13.9739 10.9541 13.7239 11.2433C13.4738 11.5324 13.3333 11.9245 13.3333 12.3334C13.3333 12.7422 13.4738 13.1344 13.7239 13.4235C13.9739 13.7126 14.313 13.875 14.6667 13.875H22.6667C23.0203 13.875 23.3594 13.7126 23.6095 13.4235C23.8595 13.1344 24 12.7422 24 12.3334C24 11.9245 23.8595 11.5324 23.6095 11.2433C23.3594 10.9541 23.0203 10.7917 22.6667 10.7917ZM25.3333 3.08337H6.66667C5.60581 3.08337 4.58839 3.57065 3.83824 4.43801C3.0881 5.30536 2.66667 6.48175 2.66667 7.70837V23.125C2.66667 24.3517 3.0881 25.5281 3.83824 26.3954C4.58839 27.2628 5.60581 27.75 6.66667 27.75H22.12L27.0533 33.4696C27.1779 33.6125 27.3257 33.7256 27.4881 33.8023C27.6506 33.879 27.8245 33.9179 28 33.9167C28.1749 33.9219 28.3484 33.8797 28.5067 33.7934C28.7502 33.6777 28.9586 33.4813 29.1057 33.2289C29.2528 32.9765 29.332 32.6794 29.3333 32.375V7.70837C29.3333 6.48175 28.9119 5.30536 28.1618 4.43801C27.4116 3.57065 26.3942 3.08337 25.3333 3.08337ZM26.6667 28.6596L23.6133 25.1138C23.4887 24.9709 23.341 24.8579 23.1785 24.7811C23.0161 24.7044 22.8421 24.6655 22.6667 24.6667H6.66667C6.31305 24.6667 5.97391 24.5043 5.72386 24.2152C5.47381 23.926 5.33334 23.5339 5.33334 23.125V7.70837C5.33334 7.2995 5.47381 6.90737 5.72386 6.61825C5.97391 6.32913 6.31305 6.16671 6.66667 6.16671H25.3333C25.687 6.16671 26.0261 6.32913 26.2761 6.61825C26.5262 6.90737 26.6667 7.2995 26.6667 7.70837V28.6596Z" fill="black"/>
                      </svg>
                      <p>{item}</p>
                  </div>
                )
              })
             }
              <hr/>
        </div>
      }
    </div>)
  }
  useEffect(() => {
      if(search !== "") {
        setIsSearchToggle(true);
      }
      console.log(usernames[search])
  }, [search])

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    console.log(currentTxts)
    console.log(typeof(currentTxts))
  }, [currentTxts])
  
  

  return (
    <div className="app_dashboard">
      <div className="container">
          <div className="side">
              <div className="side1">
                <img src={logo} width={55} height={55} />
                <hr/>
                  <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
                      <path d="M22.3333 40.6667C32.4586 40.6667 40.6667 32.4586 40.6667 22.3333C40.6667 12.2081 32.4586 4 22.3333 4C12.2081 4 4 12.2081 4 22.3333C4 32.4586 12.2081 40.6667 22.3333 40.6667Z" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M49.5059 49.5059L35.2812 35.2812" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                <hr/>
                <div className="discords">
                  <img src={discord} className="disImg" />
                  <img src={discord} className="disImg" />
                  <img src={discord} className="disImg" />
                  <img src={discord} className="disImg" />
                </div>
              </div>
              <div className="side2">
                  <div className="sideHeader">
                    <p>Conduit.Works</p>
                  </div>
                  <div>
                    <hr/>
                    <h2>Channels</h2>

                  </div>
              </div>
          </div>
          <div className="main">
                <div className="search">
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                    <path d="M18.2727 33.2727C26.557 33.2727 33.2727 26.557 33.2727 18.2727C33.2727 9.98843 26.557 3.27271 18.2727 3.27271C9.98843 3.27271 3.27271 9.98843 3.27271 18.2727C3.27271 26.557 9.98843 33.2727 18.2727 33.2727Z" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M40.5048 40.5048L28.8665 28.8665" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search username here" />
                  {
                    isSearchToggle && <SearchToggle/>
                  }
                </div>
                <div className="conversions">
                    <div className="alltexts">
                      {
                        currentTxts?.length !== 0 ? <div>
                          {
                            currentTxts?.map((item, index) => {
                              return(
                                <div className="textBox">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" viewBox="0 0 63 63" fill="none">
                                    <path d="M16.4687 46.4038L16.3399 46.7174L16.5836 46.9531C20.585 50.8239 25.9319 52.9915 31.4992 53H31.5007C37.068 52.9915 42.4149 50.8239 46.4163 46.9531L46.66 46.7174L46.5312 46.4038C45.3069 43.4233 43.2242 40.8742 40.5478 39.0801C37.8714 37.2861 34.722 36.3282 31.4999 36.3282C28.2779 36.3282 25.1285 37.2861 22.4521 39.0801C19.7757 40.8742 17.693 43.4233 16.4687 46.4038ZM49.2071 42.2524L49.6378 42.9891L50.0699 42.2531C51.984 38.9927 52.9953 35.2814 53 31.5006V31.5C53 25.7978 50.7348 20.3292 46.7027 16.2972C42.6707 12.2652 37.2021 10 31.4999 10C25.7978 10 20.3292 12.2652 16.2972 16.2972C12.2651 20.3292 9.99995 25.7978 9.99995 31.5L9.99995 31.5006C10.0046 35.2814 11.0159 38.9927 12.93 42.2531L13.3621 42.9891L13.7928 42.2524C16.0824 38.3362 19.6061 35.2901 23.8122 33.5911L24.4672 33.3265L23.9999 32.7968C22.727 31.3534 21.8976 29.5734 21.6113 27.6704C21.3249 25.7673 21.5938 23.8221 22.3856 22.068C23.1774 20.314 24.4585 18.8257 26.0752 17.7817C27.6919 16.7377 29.5755 16.1824 31.4999 16.1824C33.4244 16.1824 35.308 16.7377 36.9247 17.7817C38.5414 18.8257 39.8225 20.314 40.6143 22.068C41.4061 23.8221 41.675 25.7673 41.3886 27.6704C41.1023 29.5734 40.2729 31.3534 38.9999 32.7968L38.5327 33.3265L39.1877 33.5911C43.3938 35.2901 46.9175 38.3362 49.2071 42.2524ZM17.4446 9.95688C21.6226 7.2213 26.506 5.75967 31.4999 5.75C36.4939 5.75967 41.3773 7.2213 45.5553 9.95688C49.7337 12.6926 53.0263 16.5844 55.0321 21.1582C57.0379 25.732 57.6703 30.7904 56.8524 35.7172C56.0345 40.6437 53.8017 45.2261 50.4259 48.9063C48.0147 51.5199 45.0883 53.6057 41.831 55.0324C38.5736 56.4592 35.0561 57.1957 31.4999 57.1957C27.9438 57.1957 24.4263 56.4592 21.1689 55.0324C17.9116 53.6057 14.9851 51.5198 12.5739 48.9062C9.19817 45.226 6.9654 40.6437 6.14751 35.7172C5.32956 30.7904 5.96201 25.732 7.96782 21.1582C9.97363 16.5844 13.2662 12.6926 17.4446 9.95688ZM26.719 23.0555C26.0872 24.0011 25.7499 25.1128 25.7499 26.25C25.7499 27.775 26.3557 29.2375 27.4341 30.3159C28.5124 31.3942 29.975 32 31.4999 32C32.6372 32 33.7489 31.6628 34.6945 31.031C35.6401 30.3991 36.3771 29.5011 36.8123 28.4504C37.2475 27.3998 37.3613 26.2436 37.1395 25.1282C36.9176 24.0128 36.37 22.9883 35.5658 22.1841C34.7617 21.38 33.7371 20.8323 32.6217 20.6105C31.5063 20.3886 30.3502 20.5025 29.2995 20.9377C28.2488 21.3729 27.3508 22.1099 26.719 23.0555Z" fill="black" stroke="black"/>
                                  </svg>
                                  <div>
                                      <h2>{item?.username} <span>{item?.timestamp}</span></h2>
                                      <p>{item?.content}</p>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div> : <div className="noTexts">
                          <p>Select the Valid Transaction</p>
                        </div>
                      }
                      {/* {
                        currentTxts?.map((item, index) => {
                          return(
                            <div className="textBox">
                            <svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" viewBox="0 0 63 63" fill="none">
                              <path d="M16.4687 46.4038L16.3399 46.7174L16.5836 46.9531C20.585 50.8239 25.9319 52.9915 31.4992 53H31.5007C37.068 52.9915 42.4149 50.8239 46.4163 46.9531L46.66 46.7174L46.5312 46.4038C45.3069 43.4233 43.2242 40.8742 40.5478 39.0801C37.8714 37.2861 34.722 36.3282 31.4999 36.3282C28.2779 36.3282 25.1285 37.2861 22.4521 39.0801C19.7757 40.8742 17.693 43.4233 16.4687 46.4038ZM49.2071 42.2524L49.6378 42.9891L50.0699 42.2531C51.984 38.9927 52.9953 35.2814 53 31.5006V31.5C53 25.7978 50.7348 20.3292 46.7027 16.2972C42.6707 12.2652 37.2021 10 31.4999 10C25.7978 10 20.3292 12.2652 16.2972 16.2972C12.2651 20.3292 9.99995 25.7978 9.99995 31.5L9.99995 31.5006C10.0046 35.2814 11.0159 38.9927 12.93 42.2531L13.3621 42.9891L13.7928 42.2524C16.0824 38.3362 19.6061 35.2901 23.8122 33.5911L24.4672 33.3265L23.9999 32.7968C22.727 31.3534 21.8976 29.5734 21.6113 27.6704C21.3249 25.7673 21.5938 23.8221 22.3856 22.068C23.1774 20.314 24.4585 18.8257 26.0752 17.7817C27.6919 16.7377 29.5755 16.1824 31.4999 16.1824C33.4244 16.1824 35.308 16.7377 36.9247 17.7817C38.5414 18.8257 39.8225 20.314 40.6143 22.068C41.4061 23.8221 41.675 25.7673 41.3886 27.6704C41.1023 29.5734 40.2729 31.3534 38.9999 32.7968L38.5327 33.3265L39.1877 33.5911C43.3938 35.2901 46.9175 38.3362 49.2071 42.2524ZM17.4446 9.95688C21.6226 7.2213 26.506 5.75967 31.4999 5.75C36.4939 5.75967 41.3773 7.2213 45.5553 9.95688C49.7337 12.6926 53.0263 16.5844 55.0321 21.1582C57.0379 25.732 57.6703 30.7904 56.8524 35.7172C56.0345 40.6437 53.8017 45.2261 50.4259 48.9063C48.0147 51.5199 45.0883 53.6057 41.831 55.0324C38.5736 56.4592 35.0561 57.1957 31.4999 57.1957C27.9438 57.1957 24.4263 56.4592 21.1689 55.0324C17.9116 53.6057 14.9851 51.5198 12.5739 48.9062C9.19817 45.226 6.9654 40.6437 6.14751 35.7172C5.32956 30.7904 5.96201 25.732 7.96782 21.1582C9.97363 16.5844 13.2662 12.6926 17.4446 9.95688ZM26.719 23.0555C26.0872 24.0011 25.7499 25.1128 25.7499 26.25C25.7499 27.775 26.3557 29.2375 27.4341 30.3159C28.5124 31.3942 29.975 32 31.4999 32C32.6372 32 33.7489 31.6628 34.6945 31.031C35.6401 30.3991 36.3771 29.5011 36.8123 28.4504C37.2475 27.3998 37.3613 26.2436 37.1395 25.1282C36.9176 24.0128 36.37 22.9883 35.5658 22.1841C34.7617 21.38 33.7371 20.8323 32.6217 20.6105C31.5063 20.3886 30.3502 20.5025 29.2995 20.9377C28.2488 21.3729 27.3508 22.1099 26.719 23.0555Z" fill="black" stroke="black"/>
                            </svg>
                            <div>
                                <h2>spyderweb. <span>Today at 8:02 AM</span></h2>
                                <p>hello everynyan</p>
                            </div>
                          </div>
                          )
                        })
                      } */}
                    </div>
                    {
                      ActiveTransation !== 0 && <div className="link">
                      <a href={`https://arweave.net/${ActiveTransation}`}>
                        {}
                        <p>{`https://arweave.net/${ActiveTransation}`}</p>
                      </a>
                    </div>
                    }
                    
                </div>
          </div>
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  sidebar: {
    minWidth: '6%',
    backgroundColor: '#f0f0f0',
    border: '1px solid black',
    borderRadius: '8px 0 0 8px',
    padding: '1rem',
  },
  secondarySidebar: {
    minWidth: '20%',
    backgroundColor: '#e8e8e8',
    border: '1px solid black',
    borderLeft: 'none',
    borderRadius: '0 8px 8px 0',
    padding: '1rem',
  },
  main: {
    flex: 1,
    padding: '1rem',
  },
  header: {
    height: '50px',
    backgroundColor: '#d8d8d8',
    border: '1px solid black',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  mainContent: {
    display: 'flex',              // Set display to flex to enable flexbox properties
    flexDirection: 'column',      // Align children vertically
    justifyContent: 'flex-end ', // Push the last child to the bottom
    height: 'calc(100% - 50px - 3rem)', // minus header height and margin
    backgroundColor: '#c8c8c8',
    border: '1px solid black',
    borderRadius: '8px',
    padding: '1rem',
  },
  innerContent: {
    height: '50px', // this can be adjusted
    backgroundColor: '#ffffff',
    border: '1px solid black',
    borderRadius: '8px',

  }
};

export default App;