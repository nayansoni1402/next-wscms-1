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

export const EyeIcon = (props) => {
      return (
            <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="1em"
                  role="presentation"
                  viewBox="0 0 20 20"
                  width="1em"
                  {...props}
            >
                  <path
                        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                  />
                  <path
                        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                  />
            </svg>
      );
};

export const DeleteIcon = (props) => {
      return (
            <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="1em"
                  role="presentation"
                  viewBox="0 0 20 20"
                  width="1em"
                  {...props}
            >
                  <path
                        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                  />
                  <path
                        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                  />
                  <path
                        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                  />
                  <path
                        d="M8.60834 13.75H11.3833"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                  />
                  <path
                        d="M7.91669 10.4167H12.0834"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                  />
            </svg>
      );
};

export const EditIcon = (props) => {
      return (
            <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="1em"
                  role="presentation"
                  viewBox="0 0 20 20"
                  width="1em"
                  {...props}
            >
                  <path
                        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                  />
                  <path
                        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                  />
                  <path
                        d="M2.5 18.3333H17.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                  />
            </svg>
      );
};


export const NotificationIcon = ({ size, height, width, ...props }) => {
      return (
            <svg
                  fill="none"
                  height={size || height || 24}
                  viewBox="0 0 24 24"
                  width={size || width || 24}
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
            >
                  <path
                        clipRule="evenodd"
                        d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
                        fill="currentColor"
                        fillRule="evenodd"
                  />
            </svg>
      );
};