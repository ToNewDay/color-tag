// import { css } from "@emotion/css";
// import styled from "@emotion/styled";
// import DragHandleSvg from "assets/images/settings/Drag-Handle.svg";
// import { Input, List, Spin } from "coding-oa-uikit";
// import Check from "coding-oa-uikit/lib/icon/Check";
// import Close from "coding-oa-uikit/lib/icon/Close";
// import Trash from "coding-oa-uikit/lib/icon/Trash";
// import useSWRInfinite from "swr/infinite";

// import _get from "lodash/get";
// import React, { useEffect, useRef, useState } from "react";
// import { DEFAULT_PAGE_SIZE, SWR_KEY } from "@/constants";
// import { useCtx } from "@/context";

// // #region 色标选择样式

// const CommonFormContainer = styled.div`
//   margin-left: 30px;
//   margin-right: 30px;
//   max-height: 286px;
//   overflow-y: scroll;
//   width: 432px;
// `;
// const ShowTagItem = styled.div`
//   box-sizing: border-box;
//   height: 40px;
//   padding: 6px 10px;
//   display: flex;
//   font-size: 14px;
//   justify-content: space-between;
//   border-radius: 0px;
//   border: 1px solid rgb(240, 242, 244);
//   align-items: center;
//   :hover {
//     background: rgb(245, 247, 250);
//     cursor: pointer;
//   }
//   &:hover {
//     background-color: #f0f2f4;
//     div[role="delete"] {
//       display: block;
//       position: absolute;
//       right: 10px;
//       color: #8592a6;
//     }
//     div[role="caseText"] {
//       display: none;
//     }
//   }
//   div[role="caseText"] {
//     display: block;
//     color: rgb(133, 146, 166);
//     font-family: PingFangSC-Regular;
//     font-size: 12px;
//     font-weight: normal;
//   }
//   div[role="delete"] {
//     display: none;
//     cursor: pointer;
//     &:hover {
//       color: #202d40;
//     }
//   }
// `;
// const ColorDot = styled.span`
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
//   content: "";
//   background-color: ${(props) => props.color};
// `;
// const ColorDotContainer = styled.span`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const ImgIconStyle = css`
//   margin-left: 1px;
//   margin-right: 9.5px;
// `;
// const DeleteContent = styled.div`
//   font-family: PingFangSC-Regular;
//   font-size: 14px;
//   font-weight: normal;
// `;
// const TagNameStyle = css`
//   background: rgb(235, 237, 241);
//   border-radius: 2px;
//   height: 20px;
//   margin-left: 5px;
//   padding: 0 5px;
//   font-family: PingFangSC-Regular;
//   font-size: 14px;
//   font-weight: normal;
// `;
// const RenameContainer = styled.div`
//   padding: 30px 30px 0 30px;
//   .ant-form-item {
//     margin-bottom: 0 !important;
//   }
// `;
// const RenameTitle = styled.div`
//   color: rgb(32, 45, 64);
//   font-size: 18px;
//   font-weight: 600;
//   letter-spacing: 0px;
//   line-height: 24px;
//   margin-bottom: 20px;
// `;
// const SpinContainer = styled.div`
//   text-align: center;
//   height: 40px;
//   line-height: 40px;
// `;
// interface InfoValue {
//   case_count: number;
//   color: string;
//   create_time: string;
//   creator: string;
//   id: number;
//   modifier: string;
//   name: string;
//   project_id: number;
//   repo_count: number;
//   update_time: string;
// }
// interface OptionItemProps {
//   info: InfoValue;
//   index: number;
//   onItemClick?: (n: number) => void;
//   onDeleteClick: (info, e: any) => void;
// }
// const OptionItem: React.FC<OptionItemProps> = ({
//   info,
//   index,
//   onItemClick,
//   onDeleteClick,
// }) => (
//   <ShowTagItem onClick={() => onItemClick(index)}>
//     <ColorDotContainer>
//       <img src={DragHandleSvg} alt="" className={ImgIconStyle} />
//       <ColorDot color={info.color} style={{ marginRight: 8 }} />
//       <span>{info.name}</span>
//     </ColorDotContainer>
//     <div role="caseText">
//       {info.case_count}
//       &nbsp;个用例
//     </div>
//     <div onClick={(e) => onDeleteClick(info, e)} role="delete">
//       <Trash />
//     </div>
//   </ShowTagItem>
// );

// export const TagManagement: React.FC = () => {
//   const [resList, setResList] = useState<any[]>([]);
//   const [tagOptionList, setTagOptionList] = useState<any[]>([]);
//   const [itemEditIndex, setItemEditIndex] = useState<number>(-1);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [rollLoading, setRollLoading] = useState<boolean>(true);
//   const [textLoading, setTextLoading] = useState<boolean>(false);
//   const [page, setPage] = useState<number>(0);
//   const formInst = useRef<() => Promise<any>>();
//   const { getTagList, deleteTag, updateTag } = useCtx();

//   const { data, size, setSize, mutate } = useSWRInfinite(
//     (i) => [SWR_KEY.TAG_LIST, i],
//     ([_k, page]) =>
//       getTagList({ offset: Number(page), limit: DEFAULT_PAGE_SIZE })
//   );

//   const deleteOption = async (id: string) => {
//     await deleteTag(id);
//     mutate();
//   };

 
//   const modifyOptionName = (info) => {
 
//     confirm.open({
//       isOpen: true,
//       props: { zIndex: 3000 },
//       content: (
//         <RenameContainer>
//           <RenameTitle>您确认重命名标签吗?</RenameTitle>
//           <div>
//             您正在重命名标签
//             <span className={TagNameStyle}>{info.name}</span>
//           </div>
//           <div style={{ color: "red", marginBottom: 20 }}>
//             重命名标签后,本项目下所有用到该标签的用例中,该标签均被重命名、当前共有{" "}
//             {info.repo_count} 个用例库共 {info.case_count}{" "}
//             个用例使用该标签,请谨慎操作。
//           </div>
//           <CommonForm
//             onRef={(func) => (formInst.current = func)}
//             itemList={[
//               {
//                 name: "checked",
//                 type: "checkBox",
//                 itemAttr: {
//                   options: [
//                     {
//                       label: "仍要重命名",
//                       value: "isCheck",
//                     },
//                   ],
//                 },
//               },
//             ]}
//           />
//         </RenameContainer>
//       ),
//       okText: "确认重命名",
//       confirmSubmit: async () => {
//         const values = await formInst.current();
//         if (values.checked && values.checked.length === 1) {
//           const data = {
//             project_id,
//             color: info.color,
//             name: inputValue,
//           };
//           putColorTag(info.id, data)
//             .pipe(
//               catchError(({ response }) => {
//                 message.error(
//                   response ? `${response.message}` : "该名称已存在"
//                 );
//                 return of({ response: {} });
//               }),
//               finalize(() => {})
//             )
//             .subscribe(({ response }) => {
//               if (Object.keys(response).length === 0) return;
//               onCloseGlobalConfirm();
//               setInputValue("");
//               message.success("修改标签名成功");
//               getTagLists();
//             });
//         } else {
//           message.error("勾选确认后才能执行重命名");
//         }
//       },
//     });
//   };

//   const handleScroll = (e) => {
//     if (!textLoading) {
//       setRollLoading(true);
//       setTextLoading(false);
//       const conut = e.target.scrollHeight - e.target.offsetHeight;
//       if (conut - e.target.scrollTop <= 0) {
//         setPage(page + 1);
//       }
//     }
//   };
//   return (
//     <>
//       <Spin spinning={loading}>
//         <CommonFormContainer onScroll={(e) => handleScroll(e)}>
//           <List>
//             {tagOptionList.map((item, index) => (
//               <>
//                 {index === itemEditIndex && (
//                   <Input
//                     style={{ height: 40 }}
//                     key={item.id}
//                     defaultValue={item.name}
//                     onChange={({ target: { value } }) => {
//                       setInputValue(value);
//                     }}
//                     prefix={
//                       <>
//                         <img
//                           src={DragHandleSvg}
//                           alt=""
//                           className={ImgIconStyle}
//                         />
//                         <ColorDot color={item.color} />
//                       </>
//                     }
//                     suffix={
//                       <>
//                         <Check
//                           style={{
//                             color: "rgb(79, 190, 14)",
//                             height: 14,
//                             width: 14,
//                             marginRight: 8.5,
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             modifyOptionName(item);
//                           }}
//                         />
//                         <Close
//                           style={{
//                             color: "rgb(235, 51, 63)",
//                             height: 14,
//                             width: 14,
//                             marginRight: 0,
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setItemEditIndex(-1);
//                           }}
//                         />
//                       </>
//                     }
//                   />
//                 )}
//                 {index !== itemEditIndex && (
//                   <OptionItem
//                     info={item}
//                     index={index}
//                     onItemClick={setItemEditIndex}
//                     onDeleteClick={(deleteInfo, e) => {
//                       e.stopPropagation();
//                       deleteOption(deleteInfo);
//                     }}
//                   />
//                 )}
//               </>
//             ))}
//           </List>
//           {rollLoading && (
//             <SpinContainer>
//               <Spin />
//             </SpinContainer>
//           )}
//           {textLoading && tagOptionList.length > 8 && (
//             <SpinContainer> 标签数据加载完毕 </SpinContainer>
//           )}
//         </CommonFormContainer>
//       </Spin>
//     </>
//   );
// };
