'use client';
import React, { useState } from "react";

const WsSvg = ({ type, hoverColor, size = 34, active = false }) => {
      const [isHovered, setIsHovered] = useState(false);

      const commonProps = {
            width: size,
            height: size,
            xmlns: "http://www.w3.org/2000/svg",
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false),
      };

      const getSvg = () => {
            switch (type) {
                  case "dropdownArrow":
                        return (
                              <svg {...commonProps} viewBox="0 0 20 21" fill="none">
                                    <path
                                          d="M15.8337 8L10.0003 13.8333L4.16699 8"
                                          stroke={isHovered ? hoverColor || "black" : "black"}
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                    />
                              </svg>
                        );

                  case "bellIcon":
                        return (
                              <svg {...commonProps} viewBox="0 0 34 34" fill="none">
                                    <circle
                                          cx="17"
                                          cy="17"
                                          r="16.75"
                                          fill={isHovered ? hoverColor || "#EFF4FB" : "#EFF4FB"}
                                          stroke="#D6D6D6"
                                          strokeWidth="0.5"
                                    />
                                    <path
                                          d="M20 22H25L23.595 20.595C23.4063 20.4063 23.2567 20.1822 23.1546 19.9357C23.0525 19.6891 23 19.4249 23 19.158V16C23.0002 14.7589 22.6156 13.5483 21.8992 12.5349C21.1829 11.5214 20.17 10.755 19 10.341V10C19 9.46957 18.7893 8.96086 18.4142 8.58579C18.0391 8.21071 17.5304 8 17 8C16.4696 8 15.9609 8.21071 15.5858 8.58579C15.2107 8.96086 15 9.46957 15 10V10.341C12.67 11.165 11 13.388 11 16V19.159C11 19.697 10.786 20.214 10.405 20.595L9 22H14M20 22H14M20 22V23C20 23.7956 19.6839 24.5587 19.1213 25.1213C18.5587 25.6839 17.7956 26 17 26C16.2044 26 15.4413 25.6839 14.8787 25.1213C14.3161 24.5587 14 23.7956 14 23V22"
                                          stroke="#64748B"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                    />
                                    {active && (
                                          <circle
                                                cx="28"
                                                cy="5"
                                                r="4"
                                                fill="#DC3545"
                                                stroke="white"
                                                strokeWidth="2"
                                          />
                                    )}
                              </svg>
                        );

                  case "searchIcon":
                        return (
                              <svg {...commonProps} viewBox="0 0 34 34" fill="none">
                                    <circle
                                          cx="17"
                                          cy="17"
                                          r="16.75"
                                          fill={isHovered ? hoverColor || "#EFF4FB" : "#EFF4FB"}
                                          stroke="#D6D6D6"
                                          strokeWidth="0.5"
                                    />
                                    <path
                                          d="M23.75 23.7501L19.25 19.2501M20.75 15.5001C20.75 16.1896 20.6142 16.8722 20.3504 17.5092C20.0865 18.1462 19.6998 18.7249 19.2123 19.2124C18.7248 19.6999 18.146 20.0867 17.5091 20.3505C16.8721 20.6143 16.1894 20.7501 15.5 20.7501C14.8106 20.7501 14.1279 20.6143 13.4909 20.3505C12.854 20.0867 12.2752 19.6999 11.7877 19.2124C11.3002 18.7249 10.9135 18.1462 10.6496 17.5092C10.3858 16.8722 10.25 16.1896 10.25 15.5001C10.25 14.1077 10.8031 12.7724 11.7877 11.7878C12.7723 10.8032 14.1076 10.2501 15.5 10.2501C16.8924 10.2501 18.2277 10.8032 19.2123 11.7878C20.1969 12.7724 20.75 14.1077 20.75 15.5001Z"
                                          stroke="#64748B"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                    />
                              </svg>
                        );
                  case "VerticalDotsIcon":
                        return (
                              <svg
                                    aria-hidden="true"
                                    fill="none"
                                    focusable="false"
                                    role="presentation"
                                    viewBox="0 0 24 24"
                                    {...commonProps}
                              >
                                    <path
                                          d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                                          fill="currentColor"
                                    />
                              </svg>
                        );
                  default:
                        return null;
            }
      };

      return getSvg();
};

export default WsSvg;


export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => {
      return (
            <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height={size || height}
                  role="presentation"
                  viewBox="0 0 24 24"
                  width={size || width}
                  {...props}
            >
                  <path
                        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                        fill="currentColor"
                  />
            </svg>
      );
};


export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
      return (
            <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="1em"
                  role="presentation"
                  viewBox="0 0 24 24"
                  width="1em"
                  {...otherProps}
            >
                  <path
                        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={strokeWidth}
                  />
            </svg>
      );
};

export const PlusIcon = ({ size = 24, width, height, ...props }) => {
      return (
            <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height={size || height}
                  role="presentation"
                  viewBox="0 0 24 24"
                  width={size || width}
                  {...props}
            >
                  <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                  >
                        <path d="M6 12h12" />
                        <path d="M12 18V6" />
                  </g>
            </svg>
      );
};

export const SearchIcon = (props) => {
      return (
            <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="1em"
                  role="presentation"
                  viewBox="0 0 24 24"
                  width="1em"
                  {...props}
            >
                  <path
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                  />
                  <path
                        d="M22 22L20 20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                  />
            </svg>
      );
};
