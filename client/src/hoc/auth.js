import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute = null) {
    // option:
    // null -> 누구나 접근 가능한 페이지
    // true -> 로그인한 사용자만 접근 가능한 페이지
    // false -> 로그인한 사용자는 접근할 수 없는 페이지

    function AuthenticationCheck(props) {
        const navigate = useNavigate(); 
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                //console.log(response);
 
                // 로그인하지 않은 상태
                if (!response.isAuth) {
                    if (option) {
                        navigate('/login'); // 로그인 페이지로 리다이렉트
                    }
                } else { 
                    // 로그인한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        navigate('/'); // 관리자가 아니면 홈으로 리다이렉트
                    } else {
                        if (option === false) {
                            navigate('/'); // 로그인한 사용자는 접근 불가 페이지로 리다이렉트
                        }
                    }
                }
            }).catch(err => {
                console.error('Authentication error:', err);
            });
        }, [dispatch, navigate, option, adminRoute]);

        return <SpecificComponent {...props} />;
    }

    return AuthenticationCheck;
}
